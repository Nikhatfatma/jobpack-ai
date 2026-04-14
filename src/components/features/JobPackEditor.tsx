'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './JobPackEditor.module.css';
import { JobPack } from '@/types';

interface JobPackEditorProps {
  data: JobPack;
  onSave?: (data: JobPack) => void;
  onExport: (data: JobPack) => void;
}

export const JobPackEditor: React.FC<JobPackEditorProps> = ({ data, onSave, onExport }) => {
  const [activeTab, setActiveTab] = useState('s1');
  const jpRef = useRef<HTMLDivElement>(null);
  const [showAiBanner, setShowAiBanner] = useState(true);
  
  // Single source of truth for form state
  const [formData, setFormData] = useState<any>({
    title: data?.title || "",
    metadata: data?.metadata || {},
    wellData: data?.wellData || {},
    casingStrings: data?.casingStrings?.length ? data.casingStrings : [
      { name: "", interval: "", size: "", weight: "", grade: "", threads: "", hole: "" }
    ],
    equipmentList: data?.equipmentList || [],
    businessOverview: data?.businessOverview || [],
    preJobPrep: data?.preJobPrep || [],
    runningProcedures: data?.runningProcedures || [],
    cementingProcedures: data?.cementingProcedures || [],
    acceptanceCriteria: data?.acceptanceCriteria || [],
    checklist: [
      { id: 1, label: 'All 6 metadata fields filled — no blanks, no TBD, no ASAP.', checked: false },
      { id: 2, label: 'PO / AFE number confirmed with customer before mobilisation.', checked: false },
      { id: 3, label: 'LOM data sheets verified against physical equipment on location.', checked: false },
      { id: 4, label: 'Shear pin values confirmed for all 5 tool groups.', checked: false },
      { id: 5, label: 'Torque & Drag Worksheet completed and emailed to Import Tool office.', checked: false },
      { id: 6, label: 'Setting balls measured, loaded, witnessed by Oil Company Representative.', checked: false },
      { id: 7, label: 'Drill pipe drifted — 60 mm OD drift retrieved (confirmed on Checksheet).', checked: false },
      { id: 8, label: 'Max allowable surface torque calculated and communicated to rig crew.', checked: false },
      { id: 9, label: 'Cement blend working time confirmed sufficient for full sequence.', checked: false },
      { id: 10, label: 'Contingency plans reviewed — hanger, ball, packer, and release scenarios.', checked: false },
    ],
    edgeCases: [
       { id: 1, test: "Hanger does not hang on first pressure attempt.", expected: "Increase in 500 kPa increments. If unable, raise position, set on bottom ensuring packer stays 2 m from float collar, or retrieve liner." },
       { id: 2, test: "Setting tool does not release hydraulically.", expected: "Apply left-hand rotation at 6,305 N·m to shear 2 brass pins. Body turns 1/4 turn, drops 45 mm. Pick up 1 m to confirm collet release." }
    ]
  });

  // State updaters
  const updateMeta = (k: string, v: string) => setFormData((p: any) => ({ ...p, metadata: { ...p.metadata, [k]: v } }));
  const updateWell = (k: string, v: string) => setFormData((p: any) => ({ ...p, wellData: { ...p.wellData, [k]: v } }));
  const updateTitle = (v: string) => setFormData((p: any) => ({ ...p, title: v }));

  const updateArrayField = (listName: string, idx: number, key: string, value: string) => {
    setFormData((p: any) => {
      const list = [...(p[listName] || [])];
      if (typeof list[idx] === 'object') {
        list[idx] = { ...list[idx], [key]: value };
      } else {
        list[idx] = value;
      }
      return { ...p, [listName]: list };
    });
  };

  const removeArrayItem = (listName: string, idx: number) => {
    setFormData((p: any) => ({ ...p, [listName]: (p[listName] || []).filter((_: any, i: number) => i !== idx) }));
  };

  const addArrayItem = (listName: string, item: any) => {
    setFormData((p: any) => ({ ...p, [listName]: [...(p[listName] || []), item] }));
  };

  const toggleCheck = (id: number) => {
    setFormData((p: any) => ({
      ...p,
      checklist: p.checklist.map((c: any) => c.id === id ? { ...c, checked: !c.checked } : c)
    }));
  };

  const sections = [
    { id: 's1', label: 'Metadata' },
    { id: 's2', label: 'Well & casing' },
    { id: 's3', label: 'Business overview' },
    { id: 's4', label: 'Equipment list' },
    { id: 's5', label: 'Service & rentals' },
    { id: 's6', label: 'Pre-job prep' },
    { id: 's7', label: 'Running procedures' },
    { id: 's8', label: 'Cementing & packer' },
    { id: 's9', label: 'Acceptance criteria' },
    { id: 's10', label: 'Edge cases' },
    { id: 's11', label: 'Pre-job checklist' }
  ];

  const scrl = (id: string) => {
    const el = document.getElementById(id);
    const jp = jpRef.current;
    if (el && jp) {
      jp.scrollTo({ top: el.offsetTop - jp.offsetTop - 12, behavior: 'smooth' });
    }
    setActiveTab(id);
  };

  const onScroll = useCallback(() => {
    const jp = jpRef.current;
    if (!jp) return;
    let cur = 's1';
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el && el.offsetTop - jp.offsetTop - 14 <= jp.scrollTop) {
        cur = s.id;
      }
    }
    setActiveTab(cur);
  }, []);

  const checkedCount = formData.checklist.filter((c: any) => c.checked).length;
  const { metadata: md, wellData: wd, equipmentList } = formData;

  const handleExport = () => {
    onExport(formData);
  };

  return (
    <div id="s-pack" className="scr on" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '10px 18px', background: 'var(--s1)', borderBottom: '1.5px solid var(--bd)', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, boxShadow: '0 1px 4px rgba(26,40,69,.05)' }}>
        <span style={{ background: 'var(--org)', color: 'white', padding: '4px 12px', fontSize: '10px', fontWeight: 800, letterSpacing: '.06em', borderRadius: '20px', flexShrink: 0 }}>{md.quoteNo?.split(' ')[0] || 'NEW'}</span>
        <input style={{ flex: 1, fontSize: '14px', fontWeight: 800, border: 'none', background: 'transparent', color: 'var(--navy)', outline: 'none', padding: '3px 8px', minWidth: 0, borderRadius: 'var(--rad-sm)' }} value={formData.title} onChange={e => updateTitle(e.target.value)} placeholder="Enter Job Title" />
        <div style={{ display: 'flex', gap: '7px', flexShrink: 0 }}>
          <button className="btn btn-org-o sm">✦ AI review ↗</button>
          <button className="btn btn-org sm" onClick={handleExport}>Export →</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div className={styles.sbar}>
          <div className={styles.sbSec}>Job info</div>
          {sections.slice(0, 3).map(s => (
            <div key={s.id} className={`${styles.si} ${activeTab === s.id ? styles.on : ''}`} onClick={() => scrl(s.id)}>{s.label}</div>
          ))}
          <div className={styles.sbSec}>Equipment</div>
          {sections.slice(3, 5).map(s => (
            <div key={s.id} className={`${styles.si} ${activeTab === s.id ? styles.on : ''}`} onClick={() => scrl(s.id)}>{s.label}</div>
          ))}
          <div className={styles.sbSec}>Procedures</div>
          {sections.slice(5, 8).map(s => (
            <div key={s.id} className={`${styles.si} ${activeTab === s.id ? styles.on : ''}`} onClick={() => scrl(s.id)}>{s.label}</div>
          ))}
          <div className={styles.sbSec}>Verification</div>
          {sections.slice(8).map(s => (
            <div key={s.id} className={`${styles.si} ${activeTab === s.id ? styles.on : ''}`} onClick={() => scrl(s.id)}>{s.label}</div>
          ))}
          
          <div style={{ padding: '14px', borderTop: '1px solid var(--bd)', marginTop: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--t3)', letterSpacing: '.1em', marginBottom: '8px' }}>Completeness</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--grn)', lineHeight: 1, marginBottom: '6px' }}>{Math.floor((checkedCount / 10) * 100)}%</div>
            <div className="pgw" style={{ height: '5px', marginBottom: '7px', background: 'var(--s4)', borderRadius: '100px', overflow: 'hidden' }}><div className="pgf" style={{ width: `${(checkedCount / 10) * 100}%`, background: 'var(--grn)', height: '100%', transition: 'width 0.3s' }}></div></div>
            <button className="btn btn-org" style={{ width: '100%', marginTop: '10px', textAlign: 'center', fontSize: '10px' }} onClick={handleExport}>Export →</button>
          </div>
        </div>

        {/* Content */}
        <div id="jp" ref={jpRef} onScroll={onScroll} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--bg)' }}>
          {showAiBanner && data && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '10px 14px', background: 'var(--org-lt)', border: '1.5px solid var(--org-md)', borderRadius: 'var(--rad-sm)', fontSize: '11px', flexShrink: 0 }}>
              <div className="spin" style={{ width: '11px', height: '11px', border: '2px solid var(--org-md)', borderTopColor: 'var(--org)' }}></div>
              <span style={{ fontWeight: 800, color: 'var(--org-dk)' }}>AI populated {(data.equipmentList?.length || 0) + Object.keys(wd).length + Object.keys(md).length} fields</span>
              <span style={{ color: 'var(--t2)', marginLeft: '3px' }}>from your diagram. Orange-bordered inputs are AI-extracted — verify before exporting.</span>
              <button onClick={() => setShowAiBanner(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--t2)', fontSize: '16px', lineHeight: 1 }}>×</button>
            </div>
          )}

          <Section id="s1" title="Metadata" sub="All 6 fields required">
            <div className={styles.g2}>
              <Field label="Task ID" value={md.taskId || ""} onChange={(v: string) => updateMeta('taskId', v)} />
              <div className={styles.fld}>
                <div className={styles.flb}>Priority</div>
                <select className={styles.fi} value={md.priority || 'Medium'} onChange={e => updateMeta('priority', e.target.value)}>
                  <option>High</option><option>Urgent</option><option>Medium</option><option>Low</option>
                </select>
              </div>
              <Field label="Well name" value={md.wellName || ""} onChange={(v: string) => updateMeta('wellName', v)} ai hint="✦ Extracted from diagram header" />
              <Field label="Rig" value={md.rig || ""} onChange={(v: string) => updateMeta('rig', v)} ai />
              <Field label="Customer" value={md.customer || ""} onChange={(v: string) => updateMeta('customer', v)} ai />
              <Field label="Sales rep" value={md.salesRep || ""} onChange={(v: string) => updateMeta('salesRep', v)} />
              <Field label="Quote no." value={md.quoteNo || ""} onChange={(v: string) => updateMeta('quoteNo', v)} ai />
              <Field label="Due date" value={md.dueDate || ""} onChange={(v: string) => updateMeta('dueDate', v)} />
              <div style={{ gridColumn: '1 / -1' }}>
                <Field label="Assignee" value={md.assignee || ""} onChange={(v: string) => updateMeta('assignee', v)} />
              </div>
            </div>
          </Section>

          <Section id="s2" title="Well & casing information" badge="✦ AI extracted">
            <div className={styles.g3} style={{ marginBottom: '14px' }}>
              <Field label="TD (mMD)" value={wd.td || ""} onChange={(v: string) => updateWell('td', v)} ai />
              <Field label="TVD" value={wd.tvd || ""} onChange={(v: string) => updateWell('tvd', v)} ai />
              <Field label="Heel depth" value={wd.heelDepth || ""} onChange={(v: string) => updateWell('heelDepth', v)} ai />
              <Field label="Liner top" value={wd.linerTop || ""} onChange={(v: string) => updateWell('linerTop', v)} ai />
              <Field label="Liner length" value={wd.linerLength || ""} onChange={(v: string) => updateWell('linerLength', v)} ai />
              <Field label="Overlap" value={wd.overlap || ""} onChange={(v: string) => updateWell('overlap', v)} ai />
              <Field label="Liner wt. (air)" value={wd.linerWeight || ""} onChange={(v: string) => updateWell('linerWeight', v)} ai />
              <Field label="ICP depth" value={wd.icpDepth || ""} onChange={(v: string) => updateWell('icpDepth', v)} ai />
              <Field label="Hole size" value={wd.holeSize || ""} onChange={(v: string) => updateWell('holeSize', v)} ai />
            </div>
            <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--t3)', letterSpacing: '.09em', marginBottom: '8px' }}>Casing strings</div>
            <div style={{ overflowX: 'auto' }}>
              <table className="tbl" style={{ tableLayout: 'fixed', minWidth: '500px' }}>
                <colgroup><col style={{ width: '130px' }} /><col style={{ width: '100px' }} /><col style={{ width: '70px' }} /><col style={{ width: '76px' }} /><col style={{ width: '55px' }} /><col style={{ width: '84px' }} /><col style={{ width: '68px' }} /><col style={{ width: '22px' }} /></colgroup>
                <thead><tr><th>String</th><th>Interval</th><th>Size</th><th>Weight</th><th>Grade</th><th>Threads</th><th>Hole</th><th></th></tr></thead>
                <tbody>
                  {formData.casingStrings.map((cs: any, i: number) => (
                    <tr key={i} style={i === formData.casingStrings.length - 1 ? { background: 'var(--org-lt)' } : {}}>
                      <td><input className={styles.ti} value={cs.name || ""} onChange={e => updateArrayField('casingStrings', i, 'name', e.target.value)} /></td>
                      <td><input className={styles.ti} value={cs.interval || ""} onChange={e => updateArrayField('casingStrings', i, 'interval', e.target.value)} /></td>
                      <td><input className={styles.ti} value={cs.size || ""} onChange={e => updateArrayField('casingStrings', i, 'size', e.target.value)} /></td>
                      <td><input className={styles.ti} value={cs.weight || ""} onChange={e => updateArrayField('casingStrings', i, 'weight', e.target.value)} /></td>
                      <td><input className={styles.ti} value={cs.grade || ""} onChange={e => updateArrayField('casingStrings', i, 'grade', e.target.value)} /></td>
                      <td><input className={styles.ti} value={cs.threads || ""} onChange={e => updateArrayField('casingStrings', i, 'threads', e.target.value)} /></td>
                      <td><input className={styles.ti} value={cs.hole || ""} onChange={e => updateArrayField('casingStrings', i, 'hole', e.target.value)} /></td>
                      <td><button className={styles.xdl} onClick={() => removeArrayItem('casingStrings', i)}>×</button></td>
                    </tr>
                  ))}
                  <tr><td colSpan={8}><button className="btn sm" onClick={() => addArrayItem('casingStrings', {name: "", interval: ""})} style={{width: '100%'}}>+ Add Casing String</button></td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="s3" title="Business overview" action={<button className="btn sm" style={{ background: 'rgba(255,255,255,.2)', color: 'white', borderColor: 'rgba(255,255,255,.3)', borderRadius: '14px' }}>✦ Improve ↗</button>}>
            <BulletList items={formData.businessOverview} listName="businessOverview" onChange={updateArrayField} onRemove={removeArrayItem} onAdd={() => addArrayItem('businessOverview', {content: ""})} />
          </Section>

          <Section id="s4" title="Liner equipment required" 
            action={
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span className="bdg bg" style={{ fontSize: '9px' }}>✦ AI</span>
                <button className="btn sm" onClick={() => addArrayItem('equipmentList', {description: ""})} style={{ background: 'rgba(255,255,255,.2)', color: 'white', borderColor: 'rgba(255,255,255,.3)', borderRadius: '14px' }}>+ Add row</button>
              </div>
            }
          >
            <div style={{ overflowX: 'auto' }}>
              <table className="tbl" style={{ tableLayout: 'fixed', minWidth: '570px' }}>
                <colgroup><col style={{ width: '26px' }} /><col style={{ width: '26px' }} /><col style={{ width: '70px' }} /><col style={{ width: '218px' }} /><col style={{ width: '46px' }} /><col style={{ width: '74px' }} /><col style={{ width: '76px' }} /><col style={{ width: '72px' }} /><col style={{ width: '22px' }} /></colgroup>
                <thead><tr><th>#</th><th>Qty</th><th>Size</th><th>Description</th><th>Grade</th><th>Threads</th><th>Unit cost</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {equipmentList.map((eq: any, i: number) => (
                    <tr key={i} style={i % 2 !== 0 ? { background: 'var(--s2)' } : {}}>
                      <td style={{ textAlign: 'center', fontWeight: 800, color: 'var(--org)' }}>{i + 1}</td>
                      <td style={{ textAlign: 'center' }}><input className={styles.ti} style={{textAlign: 'center'}} value={eq.qty || "1"} onChange={e => updateArrayField('equipmentList', i, 'qty', e.target.value)} /></td>
                      <td><input className={styles.ti} value={eq.size || ""} onChange={e => updateArrayField('equipmentList', i, 'size', e.target.value)} /></td>
                      <td><input className={styles.ti} value={eq.description || ""} onChange={e => updateArrayField('equipmentList', i, 'description', e.target.value)} /></td>
                      <td><input className={styles.ti} value={eq.grade || ""} onChange={e => updateArrayField('equipmentList', i, 'grade', e.target.value)} /></td>
                      <td><input className={styles.ti} value={eq.threads || ""} onChange={e => updateArrayField('equipmentList', i, 'threads', e.target.value)} /></td>
                      <td><input className={styles.ti} value={eq.unitCost || ""} onChange={e => updateArrayField('equipmentList', i, 'unitCost', e.target.value)} placeholder="-" /></td>
                      <td>
                        <select className={styles.ti} style={{padding:0}} value={eq.status || 'Confirmed'} onChange={e => updateArrayField('equipmentList', i, 'status', e.target.value)}>
                          <option>Confirmed</option>
                          <option>Review</option>
                        </select>
                      </td>
                      <td><button className={styles.xdl} onClick={() => removeArrayItem('equipmentList', i)}>×</button></td>
                    </tr>
                  ))}
                  {equipmentList.length === 0 && <tr><td colSpan={9} style={{textAlign: 'center'}}>No equipment mapped. <a onClick={() => addArrayItem('equipmentList', {description: ""})} style={{cursor:'pointer', color:'var(--org)'}}>Add item manually</a></td></tr>}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="s6" title="Pre-job preparation">
            <BulletList items={formData.preJobPrep} listName="preJobPrep" onChange={updateArrayField} onRemove={removeArrayItem} onAdd={() => addArrayItem('preJobPrep', {content: ""})} />
          </Section>

          <Section id="s7" title="Running procedures">
            <BulletList items={formData.runningProcedures} listName="runningProcedures" onChange={updateArrayField} onRemove={removeArrayItem} onAdd={() => addArrayItem('runningProcedures', {content: ""})} />
          </Section>

          <Section id="s8" title="Cementing & packer setting">
            <BulletList items={formData.cementingProcedures} listName="cementingProcedures" onChange={updateArrayField} onRemove={removeArrayItem} onAdd={() => addArrayItem('cementingProcedures', {content: ""})} />
          </Section>

          <Section id="s9" title="Acceptance criteria" action={<button className="btn sm" style={{ background: 'rgba(255,255,255,.2)', color: 'white', borderColor: 'rgba(255,255,255,.3)', borderRadius: '14px' }}>✦ Validate ↗</button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {formData.acceptanceCriteria.map((c: any, i: number) => (
                <div key={i} className={`${styles.cr} ${c.status === 'ok' ? styles.ok : styles.wn}`}>
                  <select value={c.status || "ok"} onChange={e => updateArrayField('acceptanceCriteria', i, 'status', e.target.value)} style={{background:'transparent', border:'none', outline:'none', fontWeight: 800, color: c.status === 'ok' ? 'var(--grn)' : 'var(--amb)'}}>
                    <option value="ok">OK</option><option value="wn">WARN</option>
                  </select>
                  <textarea className={styles.cta} value={c.content || ""} onChange={e => updateArrayField('acceptanceCriteria', i, 'content', e.target.value)} rows={2} onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} />
                  <button className={styles.xdl} onClick={() => removeArrayItem('acceptanceCriteria', i)}>×</button>
                </div>
              ))}
            </div>
            <button className={styles.addR} onClick={() => addArrayItem('acceptanceCriteria', {content: "", status: "ok"})}>+ Add criterion</button>
          </Section>

          <Section id="s11" title="Pre-job checklist" sub={`${checkedCount} / 10 checked`}>
            {formData.checklist.map((item: any) => (
              <label key={item.id} className={`${styles.ckr} ${item.checked ? styles.dk : ''}`}>
                <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(item.id)} />
                <span>{item.label}</span>
              </label>
            ))}
          </Section>
        </div>
      </div>

      <div className={styles.ftr}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontWeight: 700, color: 'var(--grn)' }}><div style={{ width: '8px', height: '8px', background: 'var(--grn)', borderRadius: '50%' }}></div>{Math.floor((checkedCount / 10) * 100)}% complete</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-org sm" onClick={handleExport}>Export job pack →</button>
        </div>
      </div>
    </div>
  );
};

/* ── HELPERS ── */

const Section = ({ id, title, sub, badge, action, children }: any) => (
  <div className="card" id={id} style={{ flexShrink: 0 }}>
    <div className="sh">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="sh-t">{title}</span>
        {sub && <span className="sh-t" style={{ fontSize: '9px', opacity: .85 }}>{sub}</span>}
        {badge && <span className="bdg bg" style={{ fontSize: '9px' }}>{badge}</span>}
      </div>
      {action}
    </div>
    <div className="cb">{children}</div>
  </div>
);

const Field = ({ label, value, onChange, ai, hint }: any) => (
  <div className={styles.fld}>
    <div className={styles.flb}>{label} {ai && <span style={{ color: 'var(--org)' }}>✦ AI</span>}</div>
    <input className={`${styles.fi} ${ai ? styles.aiFi : ''}`} value={value} onChange={e => onChange?.(e.target.value)} />
    {hint && <div className={styles.aiH}>{hint}</div>}
  </div>
);

const ServiceRow = ({ label, value, bg }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', border: '1.5px solid var(--bd)', borderRadius: 'var(--rad-sm)', gap: '8px', background: bg || 'transparent' }}>
    <input className={styles.ti} defaultValue={label} style={{ flex: 1, background: 'transparent' }} />
    <span style={{ fontWeight: 700, color: 'var(--org-dk)', whiteSpace: 'nowrap' }}>{value}</span>
  </div>
);

const BulletList = ({ items, listName, onChange, onRemove, onAdd }: any) => (
  <div>
    {items.map((it: any, i: number) => (
      <div key={i} className={styles.br}>
        <div className={styles.brdot}></div>
        <textarea className={styles.bta} value={it.content || it} onChange={e => onChange(listName, i, 'content', e.target.value)} rows={2} onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} />
        <button className={styles.xdl} onClick={() => onRemove(listName, i)}>×</button>
      </div>
    ))}
    <button className={styles.addR} onClick={onAdd}>+ Add point</button>
  </div>
);
