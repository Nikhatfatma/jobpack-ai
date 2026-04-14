'use client';

import React, { useState, useRef } from 'react';

interface UploadProps {
  onBack: () => void;
  onBeginProcessing: (file: File) => void;
}

export const Upload: React.FC<UploadProps> = ({ onBack, onBeginProcessing }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleProcess = () => {
    if (file) {
      onBeginProcessing(file);
    }
  };

  return (
    <div id="s-upload" className="scr on">
      <div className="pb">
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'20px'}}>
          <div><div style={{fontSize:'20px',fontWeight:800,color:'var(--navy)'}}>New job pack</div><div style={{fontSize:'12px',color:'var(--t2)',marginTop:'3px'}}>Upload a stick diagram — AI extracts every field automatically</div></div>
          <button className="btn sm" onClick={onBack}>← Back</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'14px',alignItems:'start'}}>
          <div>
            <div className="card" style={{marginBottom:'14px'}}>
              <div className="sh"><span className="sh-t">Upload stick diagram</span></div>
              <div className="cb">
                <style dangerouslySetInnerHTML={{__html: `
                  .dz { border: 2px dashed var(--bd2); border-radius: var(--rad); padding: 40px 24px; text-align: center; cursor: pointer; transition: all .18s; background: var(--s2); }
                  .dz.over, .dz:hover { border-color: var(--org); background: var(--org-lt); }
                `}} />
                <div 
                  className={`dz ${file ? 'over' : ''}`} 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <div style={{fontSize:'44px',color:'var(--bd2)',marginBottom:'14px'}}>↑</div>
                  <div style={{fontSize:'16px',fontWeight:800,color:'var(--navy)',marginBottom:'6px'}}>Drag and drop your stick diagram</div>
                  <div style={{fontSize:'11px',color:'var(--t2)',marginBottom:'18px'}}>or click to browse — up to 50 MB</div>
                  <div style={{display:'flex',gap:'7px',justifyContent:'center',flexWrap:'wrap',marginBottom:'18px'}}>
                    <span className="bdg bb">PDF</span><span className="bdg bg">PNG</span><span className="bdg bg">JPG</span><span className="bdg ba">DWG</span><span style={{border:'1.5px solid var(--bd2)',padding:'3px 9px',fontSize:'10px',fontWeight:700,color:'var(--t3)',borderRadius:'var(--rad-sm)'}}>TIFF</span>
                  </div>
                  <button className="btn btn-org" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>Browse files</button>
                </div>
                <input ref={fileInputRef} type="file" style={{display:'none'}} onChange={handleFileChange} />
                
                {file && (
                  <div style={{marginTop:'11px',padding:'11px 14px',background:'var(--grn-lt)',border:'1.5px solid var(--grn-bd)',borderRadius:'var(--rad-sm)',display:'flex',alignItems:'center',gap:'11px'}}>
                    <div style={{width:'34px',height:'34px',background:'var(--grn)',borderRadius:'var(--rad-sm)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div style={{flex:1}}><div style={{fontSize:'11px',fontWeight:700,color:'var(--grn)'}}>{file.name}</div><div style={{fontSize:'10px',color:'var(--t2)'}}>Ready to process</div></div>
                    <button onClick={() => setFile(null)} style={{background:'none',border:'none',cursor:'pointer',color:'var(--t2)',fontSize:'18px',lineHeight:1}}>×</button>
                  </div>
                )}

                <div style={{display:'flex',gap:'9px',marginTop:'12px'}}>
                  <button className="btn btn-org" style={{flex:2,textAlign:'center'}} onClick={handleProcess}>Analyse with AI →</button>
                  <button className="btn" style={{flex:1,textAlign:'center'}} onClick={() => fileInputRef.current?.click()}>Browse</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="sh"><span className="sh-t">Connect data source</span></div>
              <div className="cb"><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'9px'}}>
                {['SP\nSharePoint', 'WD\nWorkDrive', 'GD\nGoogle Drive', 'DB\nDropbox'].map((src, idx) => {
                  const [abbr, full] = src.split('\n');
                  return (
                    <div key={idx} style={{border:'1.5px solid var(--bd)',borderRadius:'var(--rad-sm)',padding:'12px 8px',textAlign:'center',cursor:'pointer',fontSize:'11px',fontWeight:700,color:'var(--t2)'}}>
                      {abbr}<br/><span style={{fontSize:'10px',fontWeight:400}}>{full}</span>
                    </div>
                  );
                })}
              </div></div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <div className="card">
              <div className="sh"><span className="sh-t">What AI extracts</span></div>
              <div>
                {[
                  'Equipment list + operating parameters',
                  'Well depths, casing sizes, overlap',
                  'Shear pressures + burst/collapse ratings',
                  'Running procedures from ITC-007-036B',
                  'Acceptance criteria + edge cases'
                ].map((txt, i) => (
                  <div key={i} style={{padding:'9px 14px',borderBottom:i===4?'none':'1px solid var(--bd)',display:'flex',alignItems:'center',gap:'9px',background:i%2===1?'var(--s2)':'transparent'}}>
                    <div style={{width:'16px',height:'16px',background:'var(--grn)',borderRadius:'var(--rad-sm)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{fontSize:'11px'}}>{txt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
