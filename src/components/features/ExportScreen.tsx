'use client';

import React, { useState } from 'react';
import styles from './ExportScreen.module.css';

interface ExportScreenProps {
  onBack: () => void;
  onGeneratePDF: () => void;
}

export const ExportScreen: React.FC<ExportScreenProps> = ({ onBack, onGeneratePDF }) => {
  const [format, setFormat] = useState('pdf');

  const handleExport = () => {
    if (format === 'pdf') {
      onGeneratePDF();
    } else {
      alert('Export to ' + format + ' is not implemented in this demo.');
    }
  };

  return (
    <div id="s-export" className="scr on">
      <div className="pb">
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'20px'}}>
          <div><div style={{fontSize:'20px',fontWeight:800,color:'var(--navy)'}}>Export job pack</div><div style={{fontSize:'12px',color:'var(--t2)',marginTop:'3px'}}>D24 / D35 / H19 — Quote 7979 — Amazing Business Results</div></div>
          <button className="btn sm" onClick={onBack}>← Back to edit</button>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 295px',gap:'14px',alignItems:'start'}}>
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:'12px',marginBottom:'14px'}}>
              <div className="sc"><div className="sc-v">47</div><div className="sc-l">AI FIELDS EXTRACTED</div></div>
              <div className="sc"><div className="sc-v" style={{color:'var(--grn)'}}>91%</div><div className="sc-l">COMPLETENESS</div></div>
              <div className="sc"><div className="sc-v" style={{color:'var(--amb)'}}>2</div><div className="sc-l">FIELDS TO REVIEW</div></div>
            </div>

            <div className="card">
              <div className="sh"><span className="sh-t">Choose export format</span></div>
              <div className="cb">
                <div className={`fmt ${format === 'pdf' ? 'sel' : ''}`} onClick={() => setFormat('pdf')}>
                  <div className="fic" style={{background:'var(--org-lt)',border:'1.5px solid var(--org-md)',color:'var(--org)'}}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="1" width="11" height="16" rx="2" fill="currentColor" opacity=".3"/><rect x="10" y="3" width="7" height="13" rx="2" fill="currentColor" opacity=".7"/><path d="M5 7h5M5 10h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
                  </div>
                  <div style={{flex:1}}><div style={{fontSize:'12px',fontWeight:800,color:'var(--navy)'}}>PDF — Import Tool template</div><div style={{fontSize:'11px',color:'var(--t2)',marginTop:'2px'}}>Matches the Liner Hanger Program layout exactly</div></div>
                  <span className="bdg bg">Recommended</span>
                </div>
                
                <div className={`fmt ${format === 'word' ? 'sel' : ''}`} onClick={() => setFormat('word')}>
                  <div className="fic" style={{background:'var(--teal-lt)',border:'1.5px solid var(--teal-md)',color:'var(--teal)',fontSize:'14px',fontWeight:800}}>W</div>
                  <div style={{flex:1}}><div style={{fontSize:'12px',fontWeight:800,color:'var(--navy)'}}>Word document (.docx)</div><div style={{fontSize:'11px',color:'var(--t2)',marginTop:'2px'}}>Formatted · editable · print-ready</div></div>
                </div>

                <div className={`fmt ${format === 'zoho' ? 'sel' : ''}`} onClick={() => setFormat('zoho')}>
                  <div className="fic" style={{background:'var(--grn-lt)',border:'1.5px solid var(--grn-bd)',color:'var(--grn)',fontSize:'14px',fontWeight:800}}>Z</div>
                  <div style={{flex:1}}><div style={{fontSize:'12px',fontWeight:800,color:'var(--navy)'}}>Zoho CRM / Projects</div><div style={{fontSize:'11px',color:'var(--t2)',marginTop:'2px'}}>Push directly to your project board</div></div>
                </div>
                
                <div className={`fmt ${format === 'email' ? 'sel' : ''}`} onClick={() => setFormat('email')}>
                  <div className="fic" style={{background:'var(--org-lt)',border:'1.5px solid var(--org-md)',color:'var(--org-dk)',fontSize:'14px',fontWeight:800}}>@</div>
                  <div style={{flex:1}}><div style={{fontSize:'12px',fontWeight:800,color:'var(--navy)'}}>Email to customer</div><div style={{fontSize:'11px',color:'var(--t2)',marginTop:'2px'}}>Draft in Gmail — Brooklyn Hollett</div></div>
                </div>

                <style dangerouslySetInnerHTML={{__html: `
                  .fmt { display: flex; align-items: center; gap: 14px; padding: 13px 15px; border: 1.5px solid var(--bd); border-radius: var(--rad-sm); cursor: pointer; margin-bottom: 8px; background: var(--s1); transition: all .14s; }
                  .fmt:hover { border-color: var(--org); background: var(--org-lt); }
                  .fmt.sel { border: 2px solid var(--org); background: var(--org-lt); }
                  .fic { width: 40px; height: 40px; border-radius: var(--rad-sm); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; flex-shrink: 0; }
                `}} />

                <button className="btn btn-org" style={{width:'100%',marginTop:'14px',padding:'11px',fontSize:'13px',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',borderRadius:'25px'}} onClick={handleExport}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="white" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  {format === 'pdf' ? 'Open PDF — Import Tool template' : `Export as ${format.toUpperCase()} →`}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="card">
              <div className="sh"><span className="sh-t">Template preview</span></div>
              <div className="cb">
                <div style={{ border: '1px solid var(--bd)', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(26,40,69,.08)' }}>
                  <div style={{ background: 'var(--org)', padding: '4px 7px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'white', fontWeight: 800, fontSize: '9px' }}>IMPORT TOOL CORPORATION LTD.</span>
                    <span style={{ color: 'white', fontSize: '9px' }}>LINER HANGER PROGRAM</span>
                  </div>
                  <div style={{ background: 'white', padding: '5px 7px', fontWeight: 800, fontSize: '11px', color: '#111', borderBottom: '1px solid #ddd' }}>Liner Hanger Program</div>
                  <div style={{ background: 'white', margin: '4px 6px', border: '1px solid #ddd', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 52px 1fr', fontSize: '8px' }}>
                      <div style={{ padding: '2px 4px', background: '#f0f2f5', fontWeight: 700, borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', color: '#333' }}>Attention</div>
                      <div style={{ padding: '2px 4px', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', color: '#333' }}>Brooklyn Hollett</div>
                      <div style={{ padding: '2px 4px', background: '#f0f2f5', fontWeight: 700, borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', color: '#333' }}>Sales rep</div>
                      <div style={{ padding: '2px 4px', borderBottom: '1px solid #ddd', color: '#333' }}>Graham Maglio</div>
                      <div style={{ padding: '2px 4px', background: '#f0f2f5', fontWeight: 700, borderRight: '1px solid #ddd', color: '#333' }}>Well</div>
                      <div style={{ padding: '2px 4px', borderRight: '1px solid #ddd', color: '#333' }}>D24/D35/H19</div>
                      <div style={{ padding: '2px 4px', background: '#f0f2f5', fontWeight: 700, borderRight: '1px solid #ddd', color: '#333' }}>Quote</div>
                      <div style={{ padding: '2px 4px', color: '#333' }}>7979</div>
                    </div>
                  </div>
                  <div style={{ background: 'var(--org)', padding: '2px 7px', margin: '0 6px 4px', fontSize: '8px', fontWeight: 800, color: 'white', borderRadius: '2px' }}>Casing information</div>
                  <div style={{ background: 'white', margin: '0 6px 5px', border: '1px solid #ddd', fontSize: '7px', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', background: '#ebebeb', borderBottom: '0.5px solid #ddd' }}>
                      <div style={{ padding: '2px 3px', color: '#555', fontWeight: 700, borderRight: '0.5px solid #ddd' }}>Descr.</div>
                      <div style={{ padding: '2px 3px', color: '#555', fontWeight: 700, borderRight: '0.5px solid #ddd' }}>Interval</div>
                      <div style={{ padding: '2px 3px', color: '#555', fontWeight: 700, borderRight: '0.5px solid #ddd' }}>Size</div>
                      <div style={{ padding: '2px 3px', color: '#555', fontWeight: 700, borderRight: '0.5px solid #ddd' }}>Wt.</div>
                      <div style={{ padding: '2px 3px', color: '#555', fontWeight: 700, borderRight: '0.5px solid #ddd' }}>Grd</div>
                      <div style={{ padding: '2px 3px', color: '#555', fontWeight: 700, borderRight: '0.5px solid #ddd' }}>Threads</div>
                      <div style={{ padding: '2px 3px', color: '#555', fontWeight: 700 }}>Hole</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
                      <div style={{ padding: '2px 3px', color: '#333', borderRight: '0.5px solid #ddd' }}>Int.</div>
                      <div style={{ padding: '2px 3px', color: '#333', borderRight: '0.5px solid #ddd' }}>0–651m</div>
                      <div style={{ padding: '2px 3px', color: '#333', borderRight: '0.5px solid #ddd' }}>244.5</div>
                      <div style={{ padding: '2px 3px', color: '#333', borderRight: '0.5px solid #ddd' }}>64.74</div>
                      <div style={{ padding: '2px 3px', color: '#333', borderRight: '0.5px solid #ddd' }}>L-80</div>
                      <div style={{ padding: '2px 3px', color: '#333', borderRight: '0.5px solid #ddd' }}>T-Blue</div>
                      <div style={{ padding: '2px 3px', color: '#333' }}>311mm</div>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--t2)', marginTop: '8px', textAlign: 'center' }}>Full 2-page PDF · ITC orange template</div>
              </div>
            </div>
            <div className="card">
              <div className="sh"><span className="sh-t">Version history</span></div>
              <div>
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--bd)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><div style={{ fontSize: '11px', fontWeight: 700 }}>Draft v1 — AI extraction</div><div style={{ fontSize: '10px', color: 'var(--t2)' }}>Today, 2:34 pm</div></div>
                  <span className="bdg bb">Current</span>
                </div>
                <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><div style={{ fontSize: '11px', color: 'var(--t2)' }}>Template baseline</div><div style={{ fontSize: '10px', color: 'var(--t3)' }}>Feb 23, 11:00 am</div></div>
                </div>
              </div>
            </div>
            <div style={{ background: 'var(--navy)', borderRadius: 'var(--rad)', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'white', letterSpacing: '.06em', marginBottom: '3px' }}>ZOHO PREMIUM PARTNER</div>
              <div style={{ fontSize: '18px', marginBottom: '5px' }}>★★★★★</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.65)', marginBottom: '12px' }}>Our 5 Star Reviews</div>
              <div style={{ display: 'flex', gap: '7px', justifyContent: 'center' }}>
                <button className="btn btn-org sm">Book a meeting</button>
                <button className="btn sm" style={{ background: 'rgba(255,255,255,.12)', color: 'white', borderColor: 'rgba(255,255,255,.25)', borderRadius: '22px' }}>Partner with us</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
