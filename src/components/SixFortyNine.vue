<template>
    <div>
        <button @click="generate">Generate</button>
    </div>
    <div id="numbers">
        <div id="cell-list">
            <button style="width:40px;height:40px;border:1px solid #000;">
                {{ one }}
            </button>
            <button style="width:40px;height:40px;border:1px solid #000;">
                {{ two }}
            </button>
            <button style="width:40px;height:40px;border:1px solid #000;">
                {{ three }}
            </button>
            <button style="width:40px;height:40px;border:1px solid #000;">
                {{ four }}
            </button>
            <button style="width:40px;height:40px;border:1px solid #000;">
                {{ five }}
            </button>
            <button style="width:40px;height:40px;border:1px solid #000;">
                {{ six }}
            </button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'SixFortyNine',
  data() {
    return {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      list1: [],
      list2: [],
    };
  },
  methods: {
    generate() {
      this.genOne();

      this.genTwo();
      if (this.two === this.one + 1 && this.one < 49) {
        this.list1.push(this.one, this.two);
      }
      if (this.two === this.one - 1 && this.one > 1) {
        this.list1.push(this.two, this.one);
      }

      this.genThree();
      if (this.list1.length === 0) {
        if (this.three === this.one + 1 && this.three === this.two - 1) {
          this.list1.push(this.one, this.three, this.two);
        }
        if (this.three === this.two + 1 && this.three === this.one - 1) {
          this.list1.push(this.two, this.three, this.one);
        }
        //
        if (this.three === this.one + 1 && this.one < 49 && this.list1.length === 0) {
          this.list1.push(this.one, this.three);
        }
        if (this.three === this.one - 1 && this.one > 1 && this.list1.length === 0) {
          this.list1.push(this.three, this.one);
        }
        if (this.three === this.two + 1 && this.two < 49 && this.list1.length === 0) {
          this.list1.push(this.two, this.three);
        }
        if (this.three === this.two - 1 && this.two > 1 && this.list1.length === 0) {
          this.list1.push(this.three, this.two);
        }
      }
      if (this.list1.length === 2 && !this.list1.includes(this.three)) {
        if (this.three === this.list1[1] + 1 && this.list1[1] < 49) {
          this.list1.push(this.three);
        }
        if (this.three === this.list1[0] - 1 && this.list1[0] > 1) {
          this.list1.unshift(this.three);
        }
      }

      this.genFour();
      if (this.list1.length === 0) {
        if (this.four === this.one + 1 && this.four === this.two - 1) {
          this.list1.push(this.one, this.four, this.two);
        }
        if (this.four === this.one + 1 && this.four === this.three - 1) {
          this.list1.push(this.one, this.four, this.three);
        }
        if (this.four === this.two + 1 && this.four === this.one - 1) {
          this.list1.push(this.two, this.four, this.one);
        }
        if (this.four === this.two + 1 && this.four === this.three - 1) {
          this.list1.push(this.two, this.four, this.three);
        }
        if (this.four === this.three + 1 && this.four === this.one - 1) {
          this.list1.push(this.three, this.four, this.one);
        }
        if (this.four === this.three + 1 && this.four === this.two - 1) {
          this.list1.push(this.three, this.four, this.two);
        }
        //
        if (this.four === this.one + 1 && this.one < 49 && this.list1.length === 0) {
          this.list1.push(this.one, this.four);
        }
        if (this.four === this.one - 1 && this.one > 1 && this.list1.length === 0) {
          this.list1.push(this.four, this.one);
        }
        if (this.four === this.two + 1 && this.two < 49 && this.list1.length === 0) {
          this.list1.push(this.two, this.four);
        }
        if (this.four === this.two - 1 && this.two > 1 && this.list1.length === 0) {
          this.list1.push(this.four, this.two);
        }
        if (this.four === this.three + 1 && this.three < 49 && this.list1.length === 0) {
          this.list1.push(this.three, this.four);
        }
        if (this.four === this.three - 1 && this.three > 1 && this.list1.length === 0) {
          this.list1.push(this.four, this.three);
        }
      }
      if (this.list1.length === 2 && !this.list1.includes(this.four)) {
        if (this.four === this.list1[1] + 1 && this.list1[1] < 49) {
          this.list1.push(this.four);
        }
        if (this.four === this.list1[0] - 1 && this.list1[0] > 1) {
          this.list1.unshift(this.four);
        }
        if (this.four === this.one + 1 && this.one < 49 && this.list1.length < 3) {
          this.list2.push(this.one, this.four);
        }
        if (this.four === this.one - 1 && this.one > 1 && this.list1.length < 3) {
          this.list2.push(this.four, this.one);
        }
        if (this.four === this.two + 1 && this.two < 49 && this.list1.length < 3) {
          this.list2.push(this.two, this.four);
        }
        if (this.four === this.two - 1 && this.two > 1 && this.list1.length < 3) {
          this.list2.push(this.four, this.two);
        }
        if (this.four === this.three + 1 && this.three < 49 && this.list1.length < 3) {
          this.list2.push(this.three, this.four);
        }
        if (this.four === this.three - 1 && this.three > 1 && this.list1.length < 3) {
          this.list2.push(this.four, this.three);
        }
      }

      this.genFive();
      if (this.list1.length === 0) {
        if (this.five === this.one + 1 && this.five === this.two - 1) {
          this.list1.push(this.one, this.five, this.two);
        }
        if (this.five === this.one + 1 && this.five === this.three - 1) {
          this.list1.push(this.one, this.five, this.three);
        }
        if (this.five === this.one + 1 && this.five === this.four - 1) {
          this.list1.push(this.one, this.five, this.four);
        }
        if (this.five === this.two + 1 && this.five === this.one - 1) {
          this.list1.push(this.two, this.five, this.one);
        }
        if (this.five === this.two + 1 && this.five === this.three - 1) {
          this.list1.push(this.two, this.five, this.three);
        }
        if (this.five === this.two + 1 && this.five === this.four - 1) {
          this.list1.push(this.two, this.five, this.four);
        }
        if (this.five === this.three + 1 && this.five === this.one - 1) {
          this.list1.push(this.three, this.five, this.one);
        }
        if (this.five === this.three + 1 && this.five === this.two - 1) {
          this.list1.push(this.three, this.five, this.two);
        }
        if (this.five === this.three + 1 && this.five === this.four - 1) {
          this.list1.push(this.three, this.five, this.four);
        }
        if (this.five === this.four + 1 && this.five === this.one - 1) {
          this.list1.push(this.four, this.five, this.one);
        }
        if (this.five === this.four + 1 && this.five === this.two - 1) {
          this.list1.push(this.four, this.five, this.two);
        }
        if (this.five === this.four + 1 && this.five === this.three - 1) {
          this.list1.push(this.four, this.five, this.three);
        }
        //
        if (this.five === this.one + 1 && this.one < 49 && this.list1.length === 0) {
          this.list1.push(this.one, this.five);
        }
        if (this.five === this.one - 1 && this.one > 1 && this.list1.length === 0) {
          this.list1.push(this.five, this.one);
        }
        if (this.five === this.two + 1 && this.two < 49 && this.list1.length === 0) {
          this.list1.push(this.two, this.five);
        }
        if (this.five === this.two - 1 && this.two > 1 && this.list1.length === 0) {
          this.list1.push(this.five, this.two);
        }
        if (this.five === this.three + 1 && this.three < 49 && this.list1.length === 0) {
          this.list1.push(this.three, this.five);
        }
        if (this.five === this.three - 1 && this.three > 1 && this.list1.length === 0) {
          this.list1.push(this.five, this.three);
        }
        if (this.five === this.four + 1 && this.four < 49 && this.list1.length === 0) {
          this.list1.push(this.four, this.five);
        }
        if (this.five === this.four - 1 && this.four > 1 && this.list1.length === 0) {
          this.list1.push(this.five, this.four);
        }
      }
      if (this.list1.length === 2 && !this.list1.includes(this.five)) {
        if (this.five === this.list1[1] + 1 && this.list1[1] < 49) {
          this.list1.push(this.five);
        }
        if (this.five === this.list1[0] - 1 && this.list1[0] > 1) {
          this.list1.unshift(this.five);
        }
        if (this.five === this.one + 1 && this.one < 49
        && this.list1.length < 3 && this.list2.length < 2) {
          this.list2.push(this.one, this.five);
        }
        if (this.five === this.one - 1 && this.one > 1
        && this.list1.length < 3 && this.list2.length < 2) {
          this.list2.push(this.five, this.one);
        }
        if (this.five === this.two + 1 && this.two < 49
        && this.list1.length < 3 && this.list2.length < 2) {
          this.list2.push(this.two, this.five);
        }
        if (this.five === this.two - 1 && this.two > 1
        && this.list1.length < 3 && this.list2.length < 2) {
          this.list2.push(this.five, this.two);
        }
        if (this.five === this.three + 1 && this.three < 49
        && this.list1.length < 3 && this.list2.length < 2) {
          this.list2.push(this.three, this.five);
        }
        if (this.five === this.three - 1 && this.three > 1
        && this.list1.length < 3 && this.list2.length < 2) {
          this.list2.push(this.five, this.three);
        }
        if (this.five === this.four + 1 && this.four < 49
        && this.list1.length < 3 && this.list2.length < 2) {
          this.list2.push(this.three, this.five);
        }
        if (this.five === this.four - 1 && this.four > 1
        && this.list1.length < 3 && this.list2.length < 2) {
          this.list2.push(this.five, this.four);
        }
      }
      if (this.list1.length === 3 && !this.list1.includes(this.five)) {
        if (this.five === this.one + 1 && this.one < 49) {
          this.list2.push(this.one, this.five);
        }
        if (this.five === this.one - 1 && this.one > 1) {
          this.list2.push(this.five, this.one);
        }
        if (this.five === this.two + 1 && this.two < 49) {
          this.list2.push(this.two, this.five);
        }
        if (this.five === this.two - 1 && this.two > 1) {
          this.list2.push(this.five, this.two);
        }
        if (this.five === this.three + 1 && this.three < 49) {
          this.list2.push(this.three, this.five);
        }
        if (this.five === this.three - 1 && this.three > 1) {
          this.list2.push(this.five, this.three);
        }
        if (this.five === this.four + 1 && this.four < 49) {
          this.list2.push(this.four, this.five);
        }
        if (this.five === this.four - 1 && this.four > 1) {
          this.list2.push(this.five, this.four);
        }
      }

      this.genSix();

      this.list1 = [];
      this.list2 = [];
    },
    genOne() {
      this.one = Math.floor(Math.random() * 49) + 1;
    },
    genTwo() {
      this.two = Math.floor(Math.random() * 49) + 1;
      if (this.two === this.one) {
        this.genTwo();
      }
    },
    genThree() {
      this.three = Math.floor(Math.random() * 49) + 1;
      if (this.three === this.one || this.three === this.two) {
        this.genThree();
      }
    },
    genFour() {
      this.four = Math.floor(Math.random() * 49) + 1;
      if (this.four === this.one
      || this.four === this.two
      || this.four === this.three
      || this.four === this.list1[0] - 1
      || this.four === this.list1[2] + 1) {
        this.genFour();
      }
    },
    genFive() {
      this.five = Math.floor(Math.random() * 49) + 1;
      if (this.five === this.one
      || this.five === this.two
      || this.five === this.three
      || this.five === this.four
      || this.five === this.list1[0] - 1
      || this.five === this.list1[2] + 1
      || (this.five === this.list1[1] + 1 && this.five === this.list2[0] - 1)
      || (this.five === this.list2[1] + 1 && this.five === this.list1[0] - 1)
      ) {
        this.genFive();
      }
    },
    genSix() {
      this.six = Math.floor(Math.random() * 49) + 1;
      if (this.six === this.one
      || this.six === this.two
      || this.six === this.three
      || this.six === this.four
      || this.six === this.five
      || this.six === this.list1[0] - 1
      || this.six === this.list1[2] + 1
      || (this.six === this.list1[1] + 1 && this.six === this.list2[0] - 1)
      || (this.six === this.list2[1] + 1 && this.six === this.list1[0] - 1)
      || (this.list1.length === 3 && this.list2.length === 2 && (
        this.six === this.list2[0] - 1
        || this.six === this.list2[2] + 1))) {
        this.genSix();
      }
    },
  },
};
</script>

<style>
#numbers{
    padding-top: 20px;
}
#cell-list button{
    display: inline;
}
</style>
