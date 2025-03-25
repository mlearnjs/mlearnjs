class GaussianNB {
    constructor() {
      this.classProbabilities = {};
      this.featureProbabilities = {};
      this.classes = [];
    }
  
    fit(X, y) {
      // Calcular la probabilidad de cada clase
      const classCounts = {};
      for (const label of y) {
        classCounts[label] = (classCounts[label] || 0) + 1;
      }
  
      const totalCount = y.length;
      this.classes = Object.keys(classCounts);
      for (const label of this.classes) {
        this.classProbabilities[label] = classCounts[label] / totalCount;
      }
  
      // Calcular la probabilidad de cada característica dado cada clase (usando media y desviación estándar)
      this.featureProbabilities = {};
  
      for (const label of this.classes) {
        const classIndices = y.map((val, idx) => val === label ? idx : -1).filter(idx => idx !== -1);
        const classData = classIndices.map(idx => X[idx]);
        
        const featureStats = classData[0].map((_, featureIndex) => {
          const featureValues = classData.map(row => row[featureIndex]);
          const mean = featureValues.reduce((a, b) => a + b, 0) / featureValues.length;
          const variance = featureValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / featureValues.length;
          const stdDev = Math.sqrt(variance);
          return { mean, stdDev };
        });
  
        this.featureProbabilities[label] = featureStats;
      }
    }
  
    // Función para calcular la probabilidad de que una característica siga una distribución normal
    gaussian(x, mean, stdDev) {
      const exponent = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
      return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * exponent;
    }
  
    // Predecir la clase de un conjunto de características
    predict(X) {
      return X.map((sample) => {
        const classScores = this.classes.map((label) => {
          let score = Math.log(this.classProbabilities[label]); // Log de la probabilidad de la clase
  
          this.featureProbabilities[label].forEach((featureStats, idx) => {
            score += Math.log(this.gaussian(sample[idx], featureStats.mean, featureStats.stdDev)); // Log de la probabilidad de la característica
          });
  
          return { label, score };
        });
  
        // Retorna la clase con la mayor probabilidad
        const bestClass = classScores.reduce((prev, current) => (prev.score > current.score ? prev : current));
        return bestClass.label;
      });
    }
  }
  
/*
  // Ejemplo de uso
  const X = [
    [1, 2],
    [1, 3],
    [2, 2],
    [3, 3],
    [3, 4]
  ];
  const y = [0, 0, 1, 1, 0];
  
  const model = new GaussianNB();
  model.fit(X, y);
  
  const predictions = model.predict([[2, 3], [3, 4]]);
  console.log(predictions); // Resultado esperado: [1, 0]
  */
 