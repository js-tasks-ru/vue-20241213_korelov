import { ref, unref, computed, watchEffect, defineComponent } from 'vue';
import { getMeetup } from './meetupsService.ts';

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetupIds = [1, 2, 3, 4, 5];

    const currentMeetupId = ref(meetupIds.at(0));
    const meetupData = ref(null);

    const isPrevButtonDisabled = computed(() => meetupIds.at(0) === unref(currentMeetupId));
    const isNextButtonDisabled = computed(() => meetupIds.at(-1) === unref(currentMeetupId));

    const handlePrevButtonClick = () => {
      const currentIndex = meetupIds.indexOf(unref(currentMeetupId));
      const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;

      currentMeetupId.value = meetupIds.at(newIndex);
    };

    const handleNextButtonClick = () => {
      const currentIndex = meetupIds.indexOf(unref(currentMeetupId));
      const newIndex = currentIndex >= meetupIds.length - 1 ? meetupIds.length - 1 : currentIndex + 1;

      currentMeetupId.value = meetupIds.at(newIndex);
    };

    watchEffect(async () => {
      try {
        meetupData.value = await getMeetup(unref(currentMeetupId));
      } catch (error) {
        meetupData.value = null;

        console.error(error);
      }
    });

    return {
      meetupIds,
      currentMeetupId,
      meetupData,
      isPrevButtonDisabled,
      isNextButtonDisabled,
      handlePrevButtonClick,
      handleNextButtonClick,
    };
  },

  template: /* html */ `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="isPrevButtonDisabled"
          @click="handlePrevButtonClick"
        >
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="meetupId in meetupIds" :key="meetupId">
            <input
              :id="\`meetup-id-\${meetupId}\`"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="meetupId"
              v-model="currentMeetupId"
            />
            <label :for="\`meetup-id-\${meetupId}\`" class="radio-group__label">{{ meetupId }}</label>
          </div>
        </div>

        <button
          class="button button--secondary"
          type="button"
          :disabled="isNextButtonDisabled"
          @click="handleNextButtonClick"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <template v-if="meetupData && meetupData.title">
            <h1 class="meetup-cover__title">{{ meetupData.title }}</h1>
          </template>
        </div>
      </div>

    </div>
  `,
});
