<template>
  <div class="stats-container">
    <div class="stats-grid">
      <div class="stat-item" v-for="(stat, index) in stats" :key="index">
        <div class="stat-icon">
          <component :is="stat.icon" />
        </div>
        <div class="stat-number">{{ animatedNumbers[index] }}</div>
        <div class="stat-label">{{ stat.label }}</div>
        <div class="pulse-dot"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  stats: {
    type: Array,
    default: () => [
      { 
        number: 1000, 
        label: '开发者', 
        icon: 'UserIcon'
      },
      { 
        number: 500, 
        label: '项目规范', 
        icon: 'DocumentIcon'
      },
      { 
        number: 10000, 
        label: '任务完成', 
        icon: 'CheckIcon'
      },
      { 
        number: 95, 
        label: '满意度%', 
        icon: 'StarIcon'
      }
    ]
  }
})

const animatedNumbers = ref(props.stats.map(() => 0))

const animateNumber = (finalNumber, index, duration = 2000) => {
  const increment = finalNumber / (duration / 16)
  let currentNumber = 0
  
  const timer = setInterval(() => {
    currentNumber += increment
    if (currentNumber >= finalNumber) {
      animatedNumbers.value[index] = finalNumber
      clearInterval(timer)
    } else {
      animatedNumbers.value[index] = Math.floor(currentNumber)
    }
  }, 16)
}

onMounted(() => {
  props.stats.forEach((stat, index) => {
    setTimeout(() => {
      animateNumber(stat.number, index)
    }, index * 200)
  })
})

// 简单的SVG图标组件
const UserIcon = {
  template: `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  `
}

const DocumentIcon = {
  template: `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  `
}

const CheckIcon = {
  template: `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  `
}

const StarIcon = {
  template: `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
  `
}
</script>

<style scoped>
.stats-container {
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
}

.stats-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.03) 2px,
    rgba(255, 255, 255, 0.03) 4px
  );
  animation: float 20s linear infinite;
}

@keyframes float {
  0% { transform: translateX(-50px) translateY(-50px); }
  100% { transform: translateX(50px) translateY(50px); }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.stat-item {
  text-align: center;
  color: white;
  position: relative;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  margin-bottom: 1rem;
  color: white;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
  font-weight: 500;
}

.pulse-dot {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 12px;
  height: 12px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.pulse-dot::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: #10b981;
  border-radius: 50%;
  opacity: 0.4;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1); 
    opacity: 1; 
  }
  50% { 
    transform: scale(1.2); 
    opacity: 0.7; 
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .stat-item {
    padding: 1.5rem 0.5rem;
  }
  
  .stat-icon {
    width: 60px;
    height: 60px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>