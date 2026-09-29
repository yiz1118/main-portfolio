// Loaded only by the browser-test server. No real email request can leave this process.
const originalFetch=globalThis.fetch;
globalThis.fetch=async(input,options)=>{
  if(String(input)==="https://api.resend.com/emails"){
    const body=JSON.parse(options.body);
    if(body.text.includes("[MOCK_FAILURE]"))return Response.json({error:"mock failure"},{status:429});
    await new Promise(resolve=>setTimeout(resolve,200));
    return Response.json({id:"test-only-receipt"});
  }
  return originalFetch(input,options);
};
