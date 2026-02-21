// Package cache provides in-memory caching functionality with TTL support
package cache

import (
	"sync"
	"time"
)

// Cache is an in-memory cache with thread-safe operations, Use Generics for type safety
type Cache[T any] struct {
	items map[string]*CacheItem[T]
	mu    sync.RWMutex
	ttl   time.Duration
}

// CacheItem represents a cached item with expiration time
type CacheItem[T any] struct {
	value     T
	expiresAt time.Time
}

// NewCache creates a new cache instance with the specified TTL
func NewCache[T any](ttl time.Duration) *Cache[T] {
	return &Cache[T]{
		items: make(map[string]*CacheItem[T]),
		ttl:   ttl,
	}
}

// Get retrieves a value from the cache by key.
func (c *Cache[T]) Get(key string) (T, bool) {
    c.mu.Lock() // write lock since we may delete
    defer c.mu.Unlock()

    item, found := c.items[key]
    if !found {
        var zero T
        return zero, false
    }
    if time.Now().After(item.expiresAt) {
        delete(c.items, key) // inline delete, no second lock
        var zero T
        return zero, false
    }
    return item.value, true
}

// Set stores a value in the cache with the cache's default TTL.
func (c *Cache[T]) Set(key string, value T) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.items[key] = &CacheItem[T]{
        value:     value,
        expiresAt: time.Now().Add(c.ttl),
    }
}

// Delete removes an item from the cache.
func (c *Cache[T]) Delete(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    delete(c.items, key)
}

// Size returns the number of items in the cache
// Returns the count of cached items
func (c *Cache[T]) Size() int {
	c.mu.RLock()
	defer c.mu.RUnlock()

	return len(c.items)
}
