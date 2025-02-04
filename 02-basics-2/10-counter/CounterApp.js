import { ref, unref, computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const MIN_NUMBER = 0;
    const MAX_NUMBER = 5;

    const count = ref(MIN_NUMBER);

    const isDecrementAvailable = computed(() => unref(count) <= MAX_NUMBER && unref(count) > MIN_NUMBER);
    const isIncrementAvailable = computed(() => unref(count) >= MIN_NUMBER && unref(count) < MAX_NUMBER);

    const handleDecrementButtonClick = () => {
      count.value = unref(count) - 1;
    };

    const handleIncrementButtonClick = () => {
      count.value = unref(count) + 1;
    };

    return {
      count,
      isDecrementAvailable,
      isIncrementAvailable,
      handleDecrementButtonClick,
      handleIncrementButtonClick,
    }
  },

  template: /*html*/ `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="!isDecrementAvailable"
        @click="handleDecrementButtonClick"
      >
        ➖
      </button>
      <span class="count" data-testid="count">{{ count }}</span>
      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="!isIncrementAvailable"
        @click="handleIncrementButtonClick"
      >
        ➕
      </button>
    </div>
  `,
})
