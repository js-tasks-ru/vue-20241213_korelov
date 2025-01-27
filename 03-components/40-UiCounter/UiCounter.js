import { computed, defineComponent } from 'vue';
import { UiButton } from '@shgk/vue-course-ui';
import './UiCounter.css';

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    const isIncreaseButtonDisabled = computed(() => props.count >= props.max);
    const isDecreaseButtonDisabled = computed(() => props.count <= props.min);

    const decreaseCount = () => {
      emit('update:count', props.count - 1);
    };

    const increaseCount = () => {
      emit('update:count', props.count + 1);
    };

    return {
      isIncreaseButtonDisabled,
      isDecreaseButtonDisabled,
      decreaseCount,
      increaseCount,
    };
  },

  template: /* html */ `
    <div class="counter">
      <UiButton
        aria-label="Decrement"
        :disabled="isDecreaseButtonDisabled"
        @click="decreaseCount"
      >
        ➖
      </UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton
        aria-label="Increment"
        :disabled="isIncreaseButtonDisabled"
        @click="increaseCount"
      >
        ➕
      </UiButton>
    </div>
  `,
});
