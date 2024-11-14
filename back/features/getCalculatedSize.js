const getCalculatedSize = (sizeInBytes) => {
  const isFloatAfter = (number) => {
    if (number % 1000 !== 0) {
      return true;
    }
    return false;
  };

  // Convert to number from string
  const bytes = Number.parseInt(sizeInBytes);

  // For bytes
  if (bytes < 1000) {
    return `{${bytes} bytes}`;
  }

  // For kilobytes
  const kilobytes = bytes / 1000;
  if (kilobytes < 1000) {
    // Float
    if (isFloatAfter(kilobytes)) {
      return `${Number.parseFloat(kilobytes).toFixed(1)} Kb`;
    }
    // Integer
    return `${kilobytes} Kb`;
  }

  // For megabytes
  const megabytes = bytes / 1000000;
  if (megabytes < 1000) {
    // Float
    if (isFloatAfter(megabytes)) {
      return `${Number.parseFloat(megabytes).toFixed(1)} Mb`;
    }
    // Integer
    return `${megabytes} Mb`;
  }

  // For gigabytes
  const gigabytes = bytes / 1000000000;
  if (gigabytes < 1000) {
    // Float
    if (isFloatAfter(gigabytes)) {
      return `${Number.parseFloat(gigabytes).toFixed(1)} Gb`;
    }
    // Integer
    return `${gigabytes} Gb`;
  }
};

module.exports = { getCalculatedSize };
