// Package cache provides in-memory caching functionality with TTL support
package cache

import (
	"sync"
	"time"
)

// CacheItem represents a cached item with expiration time
type CacheItem struct {
	value      interface{}
	expiresAt  time.Time
}

// Cache is an in-memory cache with thread-safe operations
type Cache struct {
	items map[string]*CacheItem
	mu    sync.RWMutex
	ttl   time.Duration
}

// NewCache creates a new cache instance with the specified TTL
// Parameters:
//   - ttl: Time-to-live duration for cache items
// Returns a new Cache instance
func NewCache(ttl time.Duration) *Cache {
	return &Cache{
		items: make(map[string]*CacheItem),
		ttl:   ttl,
	}
}

// Set adds or updates an item in the cache
// Parameters:
//   - key: Cache key
//   - value: Value to cache
func (c *Cache) Set(key string, value interface{}) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.items[key] = &CacheItem{
		value:     value,
		expiresAt: time.Now().Add(c.ttl),
	}
}

// Get retrieves an item from the cache if it exists and hasn't expired
// Parameters:
//   - key: Cache key
// Returns the cached value and a boolean indicating if the item was found
func (c *Cache) Get(key string) (interface{}, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	item, found := c.items[key]
	if !found {
		return nil, false
	}

	// Check if item has expired
	if time.Now().After(item.expiresAt) {
		return nil, false
	}

	return item.value, true
}

// Delete removes an item from the cache
// Parameters:
//   - key: Cache key to remove
func (c *Cache) Delete(key string) {
	c.mu.Lock()
	defer c.mu.Unlock()

	delete(c.items, key)
}

// Clear removes all items from the cache
func (c *Cache) Clear() {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.items = make(map[string]*CacheItem)
}

// Size returns the number of items in the cache
// Returns the count of cached items
func (c *Cache) Size() int {
	c.mu.RLock()
	defer c.mu.RUnlock()

	return len(c.items)
}
