<script setup>
import { computed, ref } from 'vue'
import { data as modulesData } from '../../modules.data.mts'

const props = defineProps({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  summary: { type: String, default: '' },
  install: { type: String, required: true },
  tags: { type: Array, default: () => [] }
})

const isOpen = ref(false)
const copied = ref(false)

const descriptionHtml = computed(() => modulesData[props.slug]?.html ?? '')

function open() {
  isOpen.value = true
  copied.value = false
}

function close() {
  isOpen.value = false
}

function closeOnBackdrop(event) {
  if (event.target === event.currentTarget) close()
}

function closeOnEsc(event) {
  if (event.key === 'Escape') close()
}

async function copyInstall() {
  try {
    await navigator.clipboard.writeText(props.install)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch (e) {
    const ta = document.createElement('textarea')
    ta.value = props.install
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  }
}
</script>

<template>
  <button class="module-card" @click="open" :aria-label="`Open ${name} module`">
    <div class="module-card-header">
      <h3 class="module-name">{{ name }}</h3>
    </div>
    <p v-if="summary" class="module-description">{{ summary }}</p>
    <div class="module-tags" v-if="tags.length">
      <span v-for="tag in tags" :key="tag" class="module-tag">{{ tag }}</span>
    </div>
  </button>

  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="isOpen"
        class="modal-backdrop"
        @click="closeOnBackdrop"
        @keydown="closeOnEsc"
        tabindex="-1"
      >
        <div class="modal" role="dialog" aria-modal="true" :aria-label="`${name} module`">
          <button class="modal-close" @click="close" aria-label="Close">&times;</button>

          <h2 class="modal-title">{{ name }}</h2>

          <div class="modal-section">
            <div class="modal-section-label">Install</div>
            <div class="install-row">
              <code class="install-cmd">{{ install }}</code>
              <button class="copy-btn" @click="copyInstall" :aria-label="copied ? 'Copied' : 'Copy install command'">
                <span v-if="!copied">Copy</span>
                <span v-else>Copied</span>
              </button>
            </div>
          </div>

          <div class="modal-section">
            <div class="modal-section-label">Description</div>
            <div class="modal-description vp-doc" v-html="descriptionHtml"></div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.module-card {
  display: block;
  width: 100%;
  text-align: left;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  color: inherit;
  font: inherit;
}

.module-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand-1);
}

.module-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.module-name {
  margin: 0 0 8px;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.module-description {
  margin: 0 0 16px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.module-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.module-tag {
  font-size: 0.8rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 9999;
}

.modal {
  position: relative;
  background: var(--vp-c-bg);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  padding: 32px;
  max-width: 880px;
  width: 100%;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 4px 8px;
  border-radius: 6px;
}

.modal-close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.modal-title {
  margin: 0 0 24px;
  padding-right: 32px;
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modal-section {
  margin-bottom: 20px;
}

.modal-section:last-child {
  margin-bottom: 0;
}

.modal-section-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.install-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 4px;
}

.install-cmd {
  flex: 1;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  padding: 8px 12px;
  color: var(--vp-c-text-1);
  overflow-x: auto;
  white-space: nowrap;
  align-self: center;
}

.copy-btn {
  flex-shrink: 0;
  border: none;
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
  min-width: 80px;
}

.copy-btn:hover {
  background: var(--vp-c-brand-2);
}

.modal-description {
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.7;
  font-size: 1rem;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.18s ease;
}

.modal-fade-enter-active .modal,
.modal-fade-leave-active .modal {
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal,
.modal-fade-leave-to .modal {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}

@media (max-width: 600px) {
  .modal {
    padding: 24px;
  }
  .install-row {
    flex-direction: column;
  }
  .install-cmd {
    white-space: normal;
  }
}
</style>
