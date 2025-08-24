<template>
  <div class="timeline-container">
    <h3 v-if="title" class="timeline-title">{{ title }}</h3>
    <div class="timeline">
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        class="timeline-item"
        :class="{ active: item.status === 'completed' }"
      >
        <div class="timeline-marker">
          <div class="marker-dot" :class="item.status">
            <CheckIcon v-if="item.status === 'completed'" />
            <ClockIcon v-else-if="item.status === 'in-progress'" />
            <CircleIcon v-else />
          </div>
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h4>{{ item.title }}</h4>
            <span class="timeline-date">{{ item.date }}</span>
          </div>
          <p>{{ item.description }}</p>
          <div v-if="item.tags" class="timeline-tags">
            <span 
              v-for="tag in item.tags" 
              :key="tag" 
              class="tech-stack"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  items: {
    type: Array,
    required: true
  }
})

const CheckIcon = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  `
}

const ClockIcon = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  `
}

const CircleIcon = {
  template: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  `
}
</script>

<style scoped>
.timeline-container {
  margin: 2rem 0;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6, #ec4899);
}

.timeline-item {
  position: relative;
  padding-bottom: 3rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.timeline-item.active {
  opacity: 1;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0.5rem;
}

.marker-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  box-shadow: 0 0 0 4px var(--vp-c-bg);
  transition: all 0.3s ease;
}

.marker-dot.completed {
  background: #10b981;
  box-shadow: 0 0 0 4px var(--vp-c-bg), 0 0 0 8px rgba(16, 185, 129, 0.2);
}

.marker-dot.in-progress {
  background: #f59e0b;
  box-shadow: 0 0 0 4px var(--vp-c-bg), 0 0 0 8px rgba(245, 158, 11, 0.2);
  animation: pulse 2s infinite;
}

.marker-dot.pending {
  background: #6b7280;
  box-shadow: 0 0 0 4px var(--vp-c-bg), 0 0 0 8px rgba(107, 114, 128, 0.2);
}

.timeline-content {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-left: 1rem;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.timeline-header h4 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
}

.timeline-date {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  white-space: nowrap;
}

.timeline-content p {
  margin: 0.5rem 0 1rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.timeline-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .timeline {
    padding-left: 1.5rem;
  }
  
  .timeline::before {
    left: 0.75rem;
  }
  
  .timeline-marker {
    left: -1.5rem;
  }
  
  .marker-dot {
    width: 24px;
    height: 24px;
  }
  
  .timeline-header {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .timeline-date {
    align-self: flex-start;
  }
  
  .timeline-content {
    margin-left: 0.5rem;
    padding: 1rem;
  }
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1); 
  }
  50% { 
    transform: scale(1.05); 
  }
}
</style>