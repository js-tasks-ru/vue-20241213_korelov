import { defineComponent } from 'vue';
import './MeetupDescription.css';

export default defineComponent({
  name: 'MeetupDescription',

  props: {
    description: {
      type: String,
    },
  },

  template: /* html */ `
    <div class="meetup-description">{{ description }}</div>
  `,
});
