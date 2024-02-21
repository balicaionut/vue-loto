<template>
    <div>
        <div id="numbers">
          <h2>Generated Numbers:</h2>
            <div id="cell-list">
                <button
                  v-for="(number, index) in numbersList"
                  :key="index" style="width:40px;height:40px;border:1px solid #000;"
                >
                    {{ number }}
                </button>
            </div>
        </div>
        <div style="padding: 20px">
            <button @click="convertExcelToJson">Generate</button>
        </div>
    </div>
</template>

<script setup>
// eslint-disable-next-line import/no-extraneous-dependencies
import * as XLSX from 'xlsx';
import { ref } from 'vue';

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
};
</script>

<style>
#numbers {
    padding-top: 20px;
}

#cell-list button {
    display: inline;
}
</style>
