'use client';

import React from 'react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div id="s-dash" className="scr on">
      <div className="hero">
        <div style={{width:'40px',height:'40px',background:'rgba(255,255,255,.15)',borderRadius:'var(--rad-sm)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2l2.5 5.5h6l-4.8 3.5 1.8 5.8L10 13.2 4.5 16.8l1.8-5.8L1.5 7.5h6z" fill="white" opacity=".9"/>
          </svg>
        </div>
        <div>
          <div className="hero-t">Welcome back, Graham — D24/D35/H19 is 91% complete</div>
          <div className="hero-s">2 fields need review before export · Quote 7979 · PD 204 · $127,969.50</div>
        </div>
        <div style={{marginLeft:'auto',display:'flex',gap:'8px'}}>
          <button className="btn btn-org-o sm" onClick={() => onNavigate('pack')} style={{borderColor:'rgba(255,255,255,.4)',color:'white',background:'rgba(255,255,255,.15)'}}>Review pack</button>
          <button className="btn btn-org sm" onClick={() => onNavigate('export')}>Export PDF →</button>
        </div>
      </div>

      <div className="pb">
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'20px'}}>
          <div>
            <div style={{fontSize:'20px',fontWeight:800,color:'var(--navy)',letterSpacing:'-0.3px'}}>Good afternoon, Graham.</div>
            <div style={{fontSize:'12px',color:'var(--t2)',marginTop:'3px'}}>Amazing Business Results · Cold Lake operations overview · April 2026</div>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button className="btn btn-org-o sm" onClick={() => onNavigate('upload')}>+ New job pack</button>
            <button className="btn btn-org sm" onClick={() => onNavigate('pack')}>Open D24/D35/H19 →</button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:'12px',marginBottom:'20px'}}>
          <div className="sc"><div className="sc-v">3</div><div className="sc-l">ACTIVE PACKS</div><div className="sc-s">2 complete · 1 draft</div></div>
          <div className="sc"><div className="sc-v" style={{color:'var(--grn)'}}>47</div><div className="sc-l">AI FIELDS EXTRACTED</div><div className="sc-s">Q-7979 stick diagram</div></div>
          <div className="sc"><div className="sc-v" style={{color:'var(--amb)'}}>2</div><div className="sc-l">FIELDS TO REVIEW</div><div className="sc-s">D24/D35/H19 pack</div></div>
          <div className="sc"><div className="sc-v">$128k</div><div className="sc-l">QUOTE VALUE</div><div className="sc-s">Quote 7979 Rev. 0</div></div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 312px',gap:'14px'}}>
          <div>
            <div className="card" style={{marginBottom:'14px'}}>
              <div className="sh">
                <span className="sh-t">Recent job packs</span>
                <button className="btn sm" style={{background:'rgba(255,255,255,0.18)',color:'white',borderColor:'rgba(255,255,255,0.3)',fontSize:'9px',borderRadius:'14px'}} onClick={() => onNavigate('upload')}>+ New</button>
              </div>
              <table className="tbl">
                <thead>
                  <tr><th>Well name</th><th>Program</th><th>Rig</th><th>Quote</th><th>Customer</th><th>Status</th><th style={{minWidth:'100px'}}>Progress</th><th></th></tr>
                </thead>
                <tbody>
                  <tr style={{cursor:'pointer'}} onClick={() => onNavigate('pack')}>
                    <td><span style={{fontWeight:800,color:'var(--org)'}}>D24 / D35 / H19</span></td>
                    <td>168.3 mm liner</td>
                    <td>PD 204</td>
                    <td>7979</td>
                    <td>Brooklyn Hollett</td>
                    <td><span className="bdg bg">Complete</span></td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
                        <div className="pgw" style={{flex:1,height:'6px',background:'var(--s4)',borderRadius:'100px',overflow:'hidden'}}>
                          <div className="pgf" style={{width:'91%',background:'var(--grn)',height:'100%',borderRadius:'100px'}}></div>
                        </div>
                        <span style={{fontSize:'10px',fontWeight:800,color:'var(--grn)'}}>91%</span>
                      </div>
                    </td>
                    <td><button className="btn btn-org sm" onClick={(e) => { e.stopPropagation(); onNavigate('pack'); }}>Open</button></td>
                  </tr>
                  <tr>
                    <td><span style={{fontWeight:800}}>D29-H07 ETHELLK</span></td>
                    <td>168.3 mm liner</td>
                    <td>PD 204</td>
                    <td>7981</td>
                    <td>Brooklyn Hollett</td>
                    <td><span className="bdg ba">Draft</span></td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
                        <div className="pgw" style={{flex:1,height:'6px',background:'var(--s4)',borderRadius:'100px',overflow:'hidden'}}>
                          <div className="pgf" style={{width:'62%',background:'var(--amb)',height:'100%',borderRadius:'100px'}}></div>
                        </div>
                        <span style={{fontSize:'10px',fontWeight:800,color:'var(--amb)'}}>62%</span>
                      </div>
                    </td>
                    <td><button className="btn btn-org-o sm">Open</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="sh"><span className="sh-t">D24/D35/H19 — job summary</span><span className="sh-t" style={{fontSize:'9px',opacity:0.85}}>Quote 7979 · PD 204</span></div>
              <div className="cb">
                <style dangerouslySetInnerHTML={{__html: `
                  .ig { border: 1px solid var(--bd); border-radius: var(--rad-sm); overflow: hidden; }
                  .ig-row { display: grid; grid-template-columns: 110px 1fr 110px 1fr; border-bottom: 1px solid var(--bd); }
                  .ig-row:last-child { border-bottom: none; }
                  .ig-c { padding: 6px 10px; font-size: 11px; }
                  .ig-l { font-weight: 700; color: var(--t2); background: var(--s3); }
                  .ig-v { color: var(--t1); }
                `}} />
                <div className="ig" style={{marginBottom:'14px'}}>
                  <div className="ig-row"><div className="ig-c ig-l">Well name</div><div className="ig-c ig-v" style={{fontWeight:800,color:'var(--org)'}}>D24 / D35 / H19</div><div className="ig-c ig-l">Quote no.</div><div className="ig-c ig-v">7979 — Rev. 0</div></div>
                  <div className="ig-row"><div className="ig-c ig-l">Customer</div><div className="ig-c ig-v">Brooklyn Hollett · (709) 763-7279</div><div className="ig-c ig-l">Sales rep</div><div className="ig-c ig-v">Graham Maglio</div></div>
                  <div className="ig-row"><div className="ig-c ig-l">Rig</div><div className="ig-c ig-v">PD 204</div><div className="ig-c ig-l">Date</div><div className="ig-c ig-v">February 23, 2026</div></div>
                  <div className="ig-row"><div className="ig-c ig-l">Liner</div><div className="ig-c ig-v">168.3 mm · 29.76 kg/m · L-80 TXP · 604–1,799 m MD</div><div className="ig-c ig-l">Total value</div><div className="ig-c ig-v" style={{fontWeight:800,color:'var(--org)'}}>$127,969.50</div></div>
                </div>
                <div style={{display:'flex',gap:'8px'}}>
                  <button className="btn btn-org sm" onClick={() => onNavigate('pack')}>Edit job pack →</button>
                  <button className="btn btn-teal sm" onClick={() => onNavigate('export')}>Export PDF</button>
                  <button className="btn sm">✦ AI review ↗</button>
                </div>
              </div>
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <div className="card">
              <div className="sh"><span className="sh-t">AI extraction — Q-7979</span></div>
              <div className="cb">
                <div style={{marginBottom:'14px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'7px'}}><span style={{fontSize:'11px',color:'var(--t2)'}}>Completeness</span><span style={{fontSize:'20px',fontWeight:800,color:'var(--grn)'}}>91%</span></div>
                  <div className="pgw" style={{height:'8px',background:'var(--s4)',borderRadius:'100px',overflow:'hidden'}}><div className="pgf" style={{width:'91%',background:'var(--grn)',height:'100%'}}></div></div>
                </div>
                <table className="tbl" style={{marginBottom:'12px'}}>
                  <tbody>
                    <tr><td style={{fontWeight:600}}>Fields extracted</td><td style={{textAlign:'right',fontWeight:800}}>47 / 51</td></tr>
                    <tr><td style={{fontWeight:600}}>Needs review</td><td style={{textAlign:'right'}}><span className="bdg ba">2 fields</span></td></tr>
                    <tr><td style={{fontWeight:600}}>Equipment items</td><td style={{textAlign:'right',fontWeight:800}}>11</td></tr>
                    <tr><td style={{fontWeight:600}}>Procedure ref.</td><td style={{textAlign:'right',fontSize:'10px',color:'var(--t2)'}}>ITC-007-036B</td></tr>
                  </tbody>
                </table>
                <button className="btn btn-org" style={{width:'100%',textAlign:'center'}} onClick={() => onNavigate('pack')}>Review job pack →</button>
              </div>
            </div>

            <div className="card">
              <div className="sh"><span className="sh-t">Activity feed</span></div>
              <div>
                <style dangerouslySetInnerHTML={{__html: `
                  .av-r { display: flex; align-items: flex-start; gap: 11px; padding: 9px 14px; border-bottom: 1px solid var(--bd); transition: background .12s; }
                  .av-r:last-child { border-bottom: none; }
                  .av-r:hover { background: var(--s2); }
                  .av-pip { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 3px; }
                `}} />
                <div className="av-r"><div className="av-pip" style={{background:'var(--grn)'}}></div><div><div style={{fontSize:'11px',fontWeight:700}}>AI extraction complete</div><div style={{fontSize:'10px',color:'var(--t2)'}}>D24/D35/H19 · 47 fields · Today 2:34 pm</div></div></div>
                <div className="av-r"><div className="av-pip" style={{background:'var(--org)'}}></div><div><div style={{fontSize:'11px',fontWeight:700}}>Job pack opened</div><div style={{fontSize:'10px',color:'var(--t2)'}}>Q-7979 · Today 2:28 pm</div></div></div>
              </div>
            </div>

            <div style={{background:'var(--navy)',borderRadius:'var(--rad)',padding:'16px',textAlign:'center'}}>
              <div style={{fontSize:'11px',fontWeight:800,color:'white',letterSpacing:'0.06em',marginBottom:'3px'}}>ZOHO PREMIUM PARTNER</div>
              <div style={{fontSize:'18px',marginBottom:'4px'}}>★★★★★</div>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,0.7)',marginBottom:'12px'}}>Our 5 Star Reviews · amazingbusinessresults.com</div>
              <div style={{display:'flex',gap:'7px',justifyContent:'center'}}>
                <button className="btn btn-org sm">Book a meeting</button>
                <button className="btn sm" style={{background:'rgba(255,255,255,0.12)',color:'white',borderColor:'rgba(255,255,255,0.25)',borderRadius:'22px'}}>Partner with us</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
