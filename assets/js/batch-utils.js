(function (global) {
  function normalizeValue(value) {
    return String(value ?? '').trim();
  }

  function getBatchDisplayStatus(batch) {
    const state = normalizeValue(batch?.state || batch?.status);
    if (state) return state;

    const screeningStatus = normalizeValue(batch?.screening_status);
    if (screeningStatus) return screeningStatus;

    return 'Pending';
  }

  function getBatchIdentifier(batch) {
    return batch?.batch_id || batch?.barcode_id || batch?.id || 'Unknown';
  }

  function getBatchVolume(batch) {
    return Number(batch?.volume_ml || batch?.volume || 0);
  }

  function isPendingLabBatch(batch) {
    const state = normalizeValue(batch?.state || batch?.status).toLowerCase();
    const screeningStatus = normalizeValue(batch?.screening_status).toLowerCase();
    const labResult = normalizeValue(batch?.lab_result).toLowerCase();
    const pendingStates = ['pasteurization', 'received', 'pending', 'pending lab', 'pending lab testing', 'waiting', 'waiting for lab', 'pre-storage check'];

    return pendingStates.includes(state) || pendingStates.includes(screeningStatus) || ['waiting', 'pending'].includes(labResult);
  }

  function isReadyToDispenseBatch(batch) {
    const state = normalizeValue(batch?.state || batch?.status).toLowerCase();
    const labResult = normalizeValue(batch?.lab_result).toLowerCase();
    const readyForStorageValue = batch?.ready_for_storage;
    const isExplicitlyBlocked = readyForStorageValue === false || readyForStorageValue === 'false' || readyForStorageValue === 'no' || readyForStorageValue === '0';

    if (isExplicitlyBlocked) {
      return false;
    }

    return ['passed lab test', 'available', 'ready to dispense', 'passed'].includes(state) || labResult === 'passed';
  }

  function buildInitialBatchPayload(batchData, createdAtValue = null) {
    const batchId = batchData?.batch_id || batchData?.barcode_id || batchData?.id || 'NEW-BATCH';

    return {
      batch_id: batchId,
      barcode_id: batchData?.barcode_id || batchId,
      donor_dtn: batchData?.donor_dtn || '',
      full_name: batchData?.full_name || batchData?.donor_name || '',
      collection_date: batchData?.collection_date || '',
      volume_ml: Number(batchData?.volume_ml || batchData?.volume || 0),
      state: 'Pending Lab Testing',
      status: 'Pending Lab Testing',
      lab_result: 'Waiting',
      storage_location: 'Pending Lab Testing',
      screening_status: 'Pending Lab Testing',
      ready_for_storage: false,
      created_at: createdAtValue
    };
  }

  const api = {
    getBatchDisplayStatus,
    getBatchIdentifier,
    getBatchVolume,
    isPendingLabBatch,
    isReadyToDispenseBatch,
    buildInitialBatchPayload
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  global.LacteeBatchUtils = api;
})(typeof window !== 'undefined' ? window : globalThis);
