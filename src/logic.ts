setInterval(async () => {
  const blob = fs.getBlob("/RecordStore/4200.0");
  console.log(await blob.arrayBuffer());
}, 1000);
