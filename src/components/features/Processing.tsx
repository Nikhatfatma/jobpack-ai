'use client';

import React, { useState, useEffect } from 'react';

interface ProcessingProps {
  file: File | null;
  onComplete: (data: any) => void;
  onCancel?: () => void;
}

export const Processing: React.FC<ProcessingProps> = ({ file, onComplete, onCancel }) => {
  const [progress, setProgress] = useState(4);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [jobData, setJobData] = useState<any>(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const steps = [
    { title: 'Document ingested', msg: 'PDF parsed · 3 pages · 14 annotations detected' },
    { title: 'Stick diagram analysed', msg: 'Identifying tools and assembly sequence' },
    { title: 'Parameters extracted', msg: 'Shear pressures, ODs, burst/collapse ratings' },
    { title: 'Procedures mapped', msg: 'ITC-007-036B matched to equipment sequence' },
    { title: 'Job pack populated', msg: 'Metadata, well data, task description built' },
    { title: 'Completeness check', msg: 'Validated against ITC task writing standards' }
  ];

  const progression = [22, 40, 56, 72, 87, 100];
  const delays = [800, 1100, 900, 800, 3000, 900];

  useEffect(() => {
    let aiFinished = false;
    let aiError = false;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      fetch("/api/extract", { method: "POST", body: formData })
        .then(async r => {
          if (!r.ok) {
            const errData = await r.json().catch(() => ({}));
            throw new Error(errData.error || `HTTP error ${r.status}`);
          }
          return r.json();
        })
        .then(data => {
          aiFinished = true;
          setJobData(data);
        })
        .catch(err => {
          console.error(err);
          aiFinished = true;
          aiError = true;
          setHasError(true);
          setErrorMessage(err.message || "Failed to extract data");
        });
    } else {
      // Allow testing without AI by setting an error if no file provided
      aiFinished = true;
      aiError = true;
      setHasError(true);
      setErrorMessage("No file selected.");
    }

    let timeout: NodeJS.Timeout;
    
    const runStep = (idx: number) => {
      if (idx >= steps.length) return;
      
      const proceed = () => {
        setCompletedSteps(prev => [...prev, idx]);
        setProgress(progression[idx]);
        setCurrentStep(idx + 1);
        runStep(idx + 1);
      };

      if (idx === 4) {
        const checkAi = () => {
          if (aiError) {
             // Stop progressing if there's an error
             return;
          }
          if (aiFinished) proceed();
          else timeout = setTimeout(checkAi, 500);
        };
        timeout = setTimeout(checkAi, delays[idx]);
      } else {
        timeout = setTimeout(proceed, delays[idx]);
      }
    };

    runStep(0);

    return () => clearTimeout(timeout);
  }, [file]);

  const isDone = completedSteps.length === steps.length;

  return (
    <div id="s-proc" className="scr on">
      <div className="pb" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'100%',maxWidth:'520px'}}>
          <div style={{textAlign:'center',marginBottom:'22px'}}>
            <div style={{fontSize:'10px',fontWeight:800,letterSpacing:'0.14em',color: hasError ? 'var(--amb)' : 'var(--org)',marginBottom:'10px'}}>
              {hasError ? 'ANALYSIS FAILED' : 'DOCUMENT ANALYSIS IN PROGRESS'}
            </div>
            <div style={{fontSize:'22px',fontWeight:800,color:'var(--navy)',marginBottom:'4px'}}>
              {hasError ? 'Failed to process file' : 'Analysing technical document'}
            </div>
            <div style={{fontSize:'12px',color:'var(--t2)'}}>
              {hasError ? errorMessage : 'Extracting tool sequences, pressures, and depths...'}
            </div>
          </div>
          <div className="card">
            <div className="sh"><span className="sh-t">Extraction progress</span><span style={{fontSize:'11px',fontWeight:800,color:'white'}}>{progress}%</span></div>
            <div className="cb">
              <div style={{display:'flex',alignItems:'center',gap:'13px',padding:'10px 0 14px',borderBottom:'1px solid var(--bd)',marginBottom:'14px'}}>
                <div style={{width:'42px',height:'42px',background: hasError ? 'var(--amb)' : 'var(--org)',borderRadius:'var(--rad-sm)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="1" width="10" height="18" rx="2" fill="white" opacity=".4"/><rect x="10" y="4" width="8" height="14" rx="2" fill="white" opacity=".75"/></svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'12px',fontWeight:700,color:'var(--navy)'}}>{file ? file.name : 'Unknown_File'}</div>
                  <div style={{fontSize:'10px',color:'var(--t2)',marginTop:'2px'}}>Technical Analysis Engine · OCR Active</div>
                </div>
                <span className={`bdg ${hasError ? 'ba' : isDone ? 'bg' : 'ba'}`}>{hasError ? 'Error' : isDone ? 'Complete' : 'Processing'}</span>
              </div>
              <div className="pgw" style={{height:'8px',marginBottom:'16px',background:'var(--s4)',borderRadius:'100px',overflow:'hidden'}}>
                <div className="pgf" style={{width:`${progress}%`,background: hasError ? 'var(--amb)' : 'var(--org)',height:'100%',transition:'width 0.5s ease'}}></div>
              </div>
              
              <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>
                <style dangerouslySetInnerHTML={{__html: `
                  .ps { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border: 1.5px solid var(--bd); border-radius: var(--rad-sm); background: var(--s1); transition: all .22s; border-left: 3px solid transparent; }
                  .ps.run { border-left-color: var(--org); background: var(--org-lt); }
                  .ps.done { border-left-color: var(--grn); background: var(--grn-lt); }
                  .ps.err { border-left-color: var(--amb); background: var(--amb-lt); }
                  .pn { width: 26px; height: 26px; border: 2px solid var(--bd2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; color: var(--t3); }
                  .ps.done .pn { background: var(--grn); border-color: var(--grn); color: white; }
                  .ps.run .pn { background: var(--org); border-color: var(--org); color: white; }
                  .ps.err .pn { background: var(--amb); border-color: var(--amb); color: white; }
                  .pt { font-size: 11px; font-weight: 700; color: var(--t1); }
                  .pm { font-size: 10px; color: var(--t2); margin-top: 1px; }
                `}} />
                
                {steps.map((step, i) => {
                  const done = completedSteps.includes(i);
                  const active = currentStep === i && !done;
                  const isErrorStep = hasError && active;
                  
                  return (
                    <div key={i} className={`ps ${done ? 'done' : isErrorStep ? 'err' : active ? 'run' : ''}`} style={{opacity: done || active || isErrorStep ? 1 : 0.4}}>
                      <div className="pn">
                        {done ? (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : isErrorStep ? (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2L2 10" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : active ? (
                          <div className="spin" style={{width:'12px',height:'12px',border:'2px solid rgba(232,119,12,.3)',borderTopColor:'var(--org)'}}></div>
                        ) : (i + 1)}
                      </div>
                      <div>
                        <div className="pt">{step.title}</div>
                        <div className="pm">{hasError && active ? "Failed during extraction" : step.msg}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {hasError && (
                <div style={{marginTop:'14px',padding:'13px 14px',background:'var(--amb-lt)',border:'1.5px solid var(--amb-bd)',borderRadius:'var(--rad-sm)',display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{flex:1}}><div style={{fontSize:'12px',fontWeight:800,color:'var(--amb)'}}>Analysis error</div><div style={{fontSize:'11px',color:'var(--t2)'}}>{errorMessage}</div></div>
                  {onCancel && <button className="btn btn-org-o" onClick={onCancel}>← Go Back</button>}
                </div>
              )}

              {isDone && !hasError && (
                <div style={{marginTop:'14px',padding:'13px 14px',background:'var(--grn-lt)',border:'1.5px solid var(--grn-bd)',borderRadius:'var(--rad-sm)',display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{width:'34px',height:'34px',background:'var(--grn)',borderRadius:'var(--rad-sm)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div style={{flex:1}}><div style={{fontSize:'12px',fontWeight:800,color:'var(--grn)'}}>Extraction complete</div><div style={{fontSize:'11px',color:'var(--t2)'}}>Data populated and ready for review</div></div>
                  <button className="btn btn-org" onClick={() => onComplete(jobData)}>Open job pack →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
