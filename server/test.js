// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('./index');

import request from 'supertest';
import { expect } from 'chai';
import chaiHttp from 'chai-http'
import {app} from './index.js'




describe('GET /tokens', () => {
    it('should return an array of supported tokens', function (done) {
        this.timeout(10000);
        request(app)
        
            .get('/tokens')
            .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('success', true);
            expect(res.body).to.have.property('recommendedTokens').that.is.an('array');
            done();
        });
    });
});



describe('POST /quotes', () => {
    it('should return a quote based on input parameters', function (done) {
        this.timeout(5000); // Increase the timeout to 5 seconds

        const params = {
            dstChainId: 1,
            dstQuoteTokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            slippage: 0,
            srcChainId: 1,
            srcQuoteTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            srcQuoteTokenAmount: '1000000000000000000'
        };

        request(app)
            .post('/quotes')
            .send(params)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('routes').that.is.an('array');
                done();
            });
    });
});
