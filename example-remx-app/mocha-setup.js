const sinon = require('sinon');
const chai = require('chai');

chai.use(require('sinon-chai'));
chai.use(require('dirty-chai'));
chai.use(require('chai-truthy'));

global.expect = chai.expect;
global.sinon = sinon;
