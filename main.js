// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand;
}

const pAequorFactory = (number, arr) => {
  return {
    specimenNum: number,
    dna: arr,

    mutate() {
      const random = Math.floor(Math.random() * this.specimenNum);
      let returnedRandBase = returnRandBase();
      while (this.dna[random] !== returnedRandBase) {
        this.dna[random] = returnedRandBase;
        returnedRandBase = returnRandBase();
      }
      return this.dna;
    },

    compareDna(obj) {
      let similiar = 0;
      const length = this.dna.length;
      for (let i = 0; i < length; i++) {
        if (this.dna[i] === obj.dna[i]) {
          similiar++;
        }
      }
      const percentage = (similiar * 100) / length;
      console.log(`specimen #${this.specimenNum} and specimen #${obj.specimenNum} have ${percentage}% DNA in common`);
    },

    willLikelySurvive() {
      let count = 0;
      const length = this.dna.length;
      for (let i = 0; i < length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          count++;
        }
      }
      const percentage = (count * 100) / length;
      if (percentage >= 60) {
        return true;
      } else {
        return false;
      }
    }
  };
};

const thirthInstance = [];
let number = 1;
let pAequor = pAequorFactory(number, mockUpStrand());
while (thirthInstance.length !== 30) {
  if (pAequor.willLikelySurvive() === true) {
    thirthInstance.push(pAequor);
    number++;
    pAequor = pAequorFactory(number, mockUpStrand());
  } else {
    number++;
    pAequor = pAequorFactory(number, mockUpStrand());
  }
}