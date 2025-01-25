import { ref, unref, computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const OPERATOR = {
      SUM: 'sum',
      SUBTRACT: 'subtract',
      MULTIPLY: 'multiply',
      DIVIDE: 'divide',
    };

    const operator = ref(null);
    const number1 = ref(null);
    const number2 = ref(null);
    const result = computed(() => {
      switch (unref(operator)) {
        case OPERATOR.SUM:
          return unref(number1) + unref(number2);
        case OPERATOR.SUBTRACT:
          return unref(number1) - unref(number2);
        case OPERATOR.MULTIPLY:
          return unref(number1) * unref(number2);
        case OPERATOR.DIVIDE:
          return unref(number1) / unref(number2);
      }

      return 0;
    });

    return {
      OPERATOR,
      operator,
      number1,
      number2,
      result,
    };
  },

  template: /* html */ `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="number1" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" :value="OPERATOR.SUM" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" :value="OPERATOR.SUBTRACT" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" :value="OPERATOR.MULTIPLY" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" :value="OPERATOR.DIVIDE" v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="number2" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
});
