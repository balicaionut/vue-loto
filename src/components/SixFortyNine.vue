<template>
  <div>
    <div style="display:flex; flex-direction: row; justify-content: center;">
      <div style="padding: 10px 0 10px 0">
        Generate numbers
      </div>
      <div style="padding: 10px">
        <label for="switchCheckCombination" class="switch">
          <input
            id="switchCheckCombination"
            type="checkbox"
            @click="isCheckAccuracy = !isCheckAccuracy">
          <span class="slider round"></span>
        </label>
      </div>
      <div style="padding: 10px 0 10px 0">
        Check code accuracy
      </div>
    </div>
    <div v-if="!isCheckAccuracy">
      <div id="numbers">
      <h2>Generated Numbers:</h2>
      <div id="cell-list">
        <button
          v-for="(number, index) in numbersList"
          :key="index"
          style="width:40px;height:40px;border:1px solid #000;"
        >
          {{ number }}
        </button>
      </div>
    </div>
    <div style="padding: 20px">
      <button @click="convertExcelToJson">Generate</button>
    </div>
    </div>
    <div v-if="isCheckAccuracy">
      <h2>Insert latest combination:</h2>
      <div>
        <label for="latestCombination">
          <input
            type="text"
            id="latestCombination"
            v-model="latestCombination"
            @input="checkCombinationFormat"
          />
        </label>
        <div v-if="inputError" style="color: red;">{{ inputError }}</div>
      </div>
      <div>example: &lt;21 32 13 4 45 26></div>
      <div style="padding: 20px">
        <button
          @click="checkCodeAccuracy"
          :disabled="!!inputError || !latestCombination"
        >
          Check accuracy
        </button>
      </div>
      <div v-for="item in matchLog" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line import/no-extraneous-dependencies
import * as XLSX from 'xlsx';
import { ref } from 'vue';

const isCheckAccuracy = ref(false);

const latestCombination = ref('');
const inputError = ref('');
const latestNumbers = ref([]);
const countMatches = ref(0);
const countGenerated = ref(0);
const matchLog = ref([]);

const checkCombinationFormat = (event) => {
  console.log('combination', event.target.value);

  const input = event.target.value.trim();
  const numbers = input.split(' ');

  if (numbers.length !== 6) {
    inputError.value = 'Please enter 6 numbers separated by spaces';
    return;
  }

  if (!numbers.every((number) => /^\d+$/.test(number))) {
    inputError.value = 'Please enter only numeric values';
    return;
  }

  inputError.value = '';
};

const checkCodeAccuracy = async () => {
  matchLog.value = [];
  latestNumbers.value = latestCombination.value.split(' ').map((num) => parseInt(num, 10));
  // eslint-disable-next-line no-use-before-define
  if (!jsonData.value.length) {
    // eslint-disable-next-line no-use-before-define
    await convertExcelToJson();
  } else {
    countGenerated.value = 0;
    // eslint-disable-next-line no-use-before-define
    generateNumbers();
  }
};

const numbersList = ref([]);

const jsonData = ref([]);

const convertExcelToJson = async () => {
  try {
    const response = await fetch('/number_history.xlsx');
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!jsonData.value.length) {
        const binary = e.target.result;
        const data = new Uint8Array(binary);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonDataValue = XLSX.utils.sheet_to_json(worksheet);

        // Transform JSON data to desired format
        const transformedData = jsonDataValue.map((row) => ({
          date: row.date,
          n1: row.n1,
          n2: row.n2,
          n3: row.n3,
          n4: row.n4,
          n5: row.n5,
          n6: row.n6,
        }));

        jsonData.value = transformedData;
      }

      // Generate numbers after converting Excel to JSON
      // eslint-disable-next-line no-use-before-define
      generateNumbers();
    };

    reader.readAsArrayBuffer(blob);
  } catch (error) {
    console.error('Error loading Excel file:', error);
  }
};

const generateNumbers = async () => {
  // Get the historic numbers from the converted JSON data
  // eslint-disable-next-line max-len
  const historicNumbers = jsonData.value.flatMap((row) => [row.n1, row.n2, row.n3, row.n4, row.n5, row.n6]);

  // Calculate the frequency of each number
  const frequencyMap = {};
  historicNumbers.forEach((number) => {
    frequencyMap[number] = (frequencyMap[number] || 0) + 1;
  });

  // Generate new numbers based on frequency
  const newNumbers = [];
  const usedNumbers = new Set();
  while (newNumbers.length < 6) {
    // Generate a random number between 1 and 49
    const randomNumber = Math.floor(Math.random() * 49) + 1;

    // Check if the number is not already used and its frequency is not exhausted
    // eslint-disable-next-line max-len
    if (!usedNumbers.has(randomNumber) && frequencyMap[randomNumber] > (newNumbers.filter((n) => n === randomNumber).length || 0)) {
      newNumbers.push(randomNumber);
      usedNumbers.add(randomNumber);
    }
  }

  numbersList.value = newNumbers;

  if (isCheckAccuracy.value) {
    latestNumbers.value.forEach((number) => {
      if (newNumbers.includes(number)) {
        countMatches.value += 1;
      }
    });
    countGenerated.value += 1;
    if (countGenerated.value < 5000) {
      if (countMatches.value === 4) {
        matchLog.value.push(`4 matches at ${countGenerated.value}`);
        console.log(matchLog.value);
      }
      if (countMatches.value === 5) {
        matchLog.value.push(`5 matches at ${countGenerated.value}`);
        console.log(matchLog.value);
      }
      if (countMatches.value === 6) {
        matchLog.value.push(`6 matches at ${countGenerated.value}`);
        console.log(matchLog.value);
      }
      countMatches.value = 0;
      generateNumbers();
    }
  }
};
</script>

<style>
#numbers {
    padding-top: 10px;
}

#cell-list button {
    display: inline;
}

.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 17px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
