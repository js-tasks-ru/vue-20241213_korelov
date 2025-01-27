import { defineComponent } from 'vue';
import EmailListItem from './EmailListItem.js';

export default defineComponent({
  name: 'EmailList',

  components: {
    EmailListItem,
  },

  props: {
    emails: {
      type: Array,
      required: true,
    },
  },

  emits: ['removeEmailByIndex'],

  setup(props, { emit }) {
    const handleRemoveEmailByIndex = (index) => {
      emit('removeEmailByIndex', index);
    };

    return {
      handleRemoveEmailByIndex,
    };
  },

  template: /* html */ `
    <ul class="emails-list unstyled-list" aria-label="Emails">
      <EmailListItem
        v-for="({ email, isMarked }, index) in emails"
        :key="email"
        :email="email"
        :marked="isMarked"
        @remove-email-by-index="handleRemoveEmailByIndex(index)"
      />
    </ul>
  `,
});
