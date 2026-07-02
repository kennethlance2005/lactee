const assert = require('node:assert/strict');
const utils = require('../assets/js/batch-utils.js');

const pendingLabBatch = { state: 'Pending Lab Testing', lab_result: 'Waiting' };
const readyBatch = { state: 'Passed', lab_result: 'Passed' };
const payload = utils.buildInitialBatchPayload({ batch_id: 'ABC-123', donor_dtn: 'DTN-1', full_name: 'Jane Doe', collection_date: '2026-07-02', volume_ml: 250 });

assert.equal(utils.isPendingLabBatch(pendingLabBatch), true, 'should treat Pending Lab Testing as pending for laboratory');
assert.equal(utils.isReadyToDispenseBatch(pendingLabBatch), false, 'should not mark pending lab batches as ready to dispense');
assert.equal(utils.isReadyToDispenseBatch(readyBatch), true, 'should allow passed batches to be ready to dispense');
assert.equal(payload.state, 'Pending Lab Testing', 'new batch payload should be queued for laboratory testing');
assert.equal(payload.ready_for_storage, false, 'new batch payload should not be marked ready for storage');
assert.equal(payload.storage_location, 'Pending Lab Testing', 'new batch payload should stay out of storage until cleared');

console.log('batch-utils tests passed');
