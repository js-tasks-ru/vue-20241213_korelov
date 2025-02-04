import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmailListItem',

  props: {
    email: {
      type: String,
      required: true,
    },

    marked: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['removeEmailByIndex'],

  setup(props, { emit }) {
    const handleRemoveButtonClick = () => {
      emit('removeEmailByIndex');
    };

    return {
      handleRemoveButtonClick,
    };
  },

  template: /* html */ `
    <li :class="{ marked }">
      {{ email }}
      <button type="button" aria-label="Удалить" @click.stop="handleRemoveButtonClick">❌</button>
    </li>
  `,
});
