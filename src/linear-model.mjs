export class LinearRegression {
    constructor() {
        this.isFit = false;
        this.m = 0;
        this.b = 0;
    }

    checkDataLength(xTrain, yTrain) {
        if (xTrain.length !== yTrain.length)
            throw new Error('The parameters for training do not have the same length!');
        if (!Array.isArray(xTrain) || !Array.isArray(yTrain))
            throw new Error('The xTrain or yTrain parameters are not arrays.');
        if (xTrain.length === 0 || yTrain.length === 0)
            throw new Error('The xTrain or yTrain parameters are empty!.');
        return true;
    }
      
    fit(xTrain, yTrain) {
        try {
            this.checkDataLength(xTrain, yTrain);
            var sumX = 0;
            var sumY = 0;
            var sumXY = 0;
            var sumXX = 0;
    
            for(var i = 0; i < xTrain.length; i++) {
                sumX += xTrain[i]
                sumY += yTrain[i]
                sumXY += xTrain[i] * yTrain[i]
                sumXX += xTrain[i] * xTrain[i]
            }
            this.m = (xTrain.length * sumXY - sumX * sumY) / (xTrain.length * sumXX - Math.pow(Math.abs(sumX), 2))
            this.b = (sumY * sumXX - sumX * sumXY) / (xTrain.length * sumXX - Math.pow(Math.abs(sumX), 2))        
            this.isFit = true
        } catch (error) {
            console.error(error.message);
        }
    }

    predict(xTest) {
        var yPredict = []
        if (this.isFit) {
            for(var i = 0; i < xTest.length; i++) {
                yPredict.push(this.m * xTest[i] + this.b)
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