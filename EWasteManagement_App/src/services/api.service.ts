const request = require('request');
const axios = require('axios');

export class APIService {

    private quandleKey: string = 'oLwx-L_PRbSpv9_REj2z';
    private walkScoreKey: string = 'b5a28d85d88ca72a602ab0f9e9597f6e';

    constructor() { }

    executeZillowRequest = async (type: string, location: string, indicatorCode: string) => {
        let url: string = 'https://www.quandl.com/api/v3/datasets/ZILLOW/' + type + location + '_' + indicatorCode + '.json?api_key=' + this.quandleKey;
        //let url = 'https://www.quandl.com/api/v3/datasets/ZILLOW/C3763_MSPFAH.json?api_key=oLwx-L_PRbSpv9_REj2z';
        let result = null;
        await axios.get(url)
            .then(response => {
                if (response.status == 200) {
                    result = response.data;
                }
            })
            .catch(error => {
                console.log(error);
            });

        return result;
    }

    executeWalkScoreRequest = async (address: string, latitiude: string, longtitude: string) => {
        let url: string = `http://api.walkscore.com/score?format=json&address=${encodeURI(address)}&lat=${latitiude}&lon=${longtitude}&transit=1&bike=1&wsapikey=${this.walkScoreKey}`;
        let result = null;
        await axios.get(url)
            .then(response => {
                if (response.status == 200) {
                    result = response.data;
                }

            })
            .catch(error => {
                console.log(error);
            });
        return result;
    }
}

