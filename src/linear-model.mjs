export class LinearRegression {
    constructor() {
        this.isFit = false;
        this.m = 0;
        this.b = 0;
    }

    checkDataLength(xTrain, yTrain) {
        if (!Array.isArray(xTrain) || !Array.isArray(yTrain))
            throw new Error('The xTrain or yTrain parameters are not matrices or arrays.');
        if (xTrain.some(row => !Array.isArray(row)))
            throw new Error('xTrain must be a 2D array!');
        if (xTrain.length !== yTrain.length)
            throw new Error('The parameters for training do not have the same length!');
        return true;
    }
      
    fit(xTrain, yTrain) {
        try {
            checkDataLength(xTrain, yTrain);
            var sumX = 0;
            var sumY = 0;
            var sumXY = 0;
            var sumXX = 0;
    
            for(var i = 0; i < xTrain.length; i++) {
                const xValue = xTrain[i][0];
                sumX += xValue;
                sumY += yTrain[i];
                sumXY += xValue * yTrain[i];
                sumXX += xValue * xValue;
            }
            this.m = (xTrain.length * sumXY - sumX * sumY) / (xTrain.length * sumXX - Math.pow(Math.abs(sumX), 2));
            this.b = (sumY * sumXX - sumX * sumXY) / (xTrain.length * sumXX - Math.pow(Math.abs(sumX), 2));
            this.isFit = true;
        } catch (error) {
            console.error(error.message);
        }
    }

    predict(xTest) {
        var yPredict = []
        if (this.isFit) {
            for (var i = 0; i < xTest.length; i++) {
                let prediction = this.b; // Empezamos con el valor del bias
                for (var j = 0; j < xTest[i].length; j++) {
                    prediction += this.m[j] * xTest[i][j]; // Multiplicación punto a punto
                }
                yPredict.push(prediction); // Guardamos la predicción
            }            
        }
        return yPredict
    }
    

    mserror(yTrain, yPredict) {
        var mse = 0
        for(var i = 0; i < yTrain.length; i++) {
            mse += Math.pow(yTrain[i]-yPredict[i],2)
        }
        return mse / yTrain.length
    }

    coeficientR2(yTrain, yPredict) 
    {
        var avg=0;
        var numerator = 0;
        var denominator = 0;
        for(var i = 0; i < yTrain.length; i++) {
            avg += yTrain[i]
        }
        avg=avg/yTrain.length;
        for(var i = 0; i < yPredict.length; i++) {
            numerator += Math.pow(yPredict[i]-avg,2);
        }
        for(var i = 0; i < yTrain.length; i++) {
            denominator += Math.pow(yTrain[i]-avg,2);
        }
        return numerator/denominator
    }
}