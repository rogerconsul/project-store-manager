const { expect } = require('chai');
const { beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesController = require('../../../controllers/salesController');

