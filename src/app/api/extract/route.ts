import { NextRequest, NextResponse } from "next/server";

/**
 * STATIC DEMO ENDPOINT
 * This route no longer calls Gemini AI. 
 * It returns a predefined job pack for consistent demo performance.
 */

const STATIC_JOB_PACK = {
  title: "Run & Cement 168.3 mm Liner — Demo Well",
  metadata: {
    taskId: "WP-2026-0415",
    wellName: "Demo Well D24/D35/H19",
    rig: "PD 204",
    customer: "Brooklyn Hollett",
    quoteNo: "7979",
    priority: "High",
    salesRep: "Graham Maglio",
    dueDate: "Feb 23, 2026",
    assignee: "Import Tool Service Operator",
  },
  wellData: {
    td: "1,799 m",
    tvd: "461 m",
    heelDepth: "651 m MD",
    linerTop: "604 m MD",
    overlap: "47 m",
    holeSize: "216 mm",
    linerLength: "1,195 m",
    linerWeight: "34,875 daN",
    icpDepth: "651 m MD",
  },
  casingStrings: [
    { name: "Int. casing", interval: "0 – 651 m", size: "244.5 mm", weight: "64.74 kg/m", grade: "L-80", threads: "Tenaris Blue", hole: "311 mm" },
    { name: "Prod. liner", interval: "604–1,799 m", size: "168.3 mm", weight: "29.76 kg/m", grade: "L-80", threads: "Tenaris XP", hole: "216 mm" }
  ],
  equipmentList: [
    { id: "m1", description: "ITC HRD Setting Collar c/w 1.8 m PBR", size: "177.8 mm", grade: "L-80", threads: "Tenaris XP", status: "Confirmed", qty: "1", unitCost: "4,500" },
    { id: "m2", description: "RS Packoff Bushing w/ 158.8 mm Sealbore", size: "177.8 mm", grade: "L-80", threads: "Tenaris XP", status: "Confirmed", qty: "1", unitCost: "2,200" },
    { id: "m3", description: "ITC GTC2 TCP c/w Aflas Infused 3D Element", size: "168.3 mm", grade: "L-80", threads: "Tenaris XP", status: "Review", qty: "1", unitCost: "1,850" },
    { id: "m4", description: "ITC X-Grip Rotating Liner Hanger", size: "168.3 mm", grade: "L-80", threads: "Tenaris XP", status: "Confirmed", qty: "1", unitCost: "12,900" }
  ],
  businessOverview: [
    { id: "b1", content: "Source: Quote 7979 Rev. 0. Reference ITC-007-036B." },
    { id: "b2", content: "What: Run, hang, cement, and set packer on 1,195 m production liner." },
    { id: "b3", content: "Constraint: Equipment lost-in-hole invoiced at replacement cost." }
  ],
  preJobPrep: [
    { id: "p1", content: "Verify all equipment against data sheets." },
    { id: "p2", content: "Confirm shear pin values: hanger ~4,650 kPa." }
  ],
  runningProcedures: [
    { id: "r1", content: "Run liner in order: Valve Set Shoe -> Float Collar -> Landing Collar." },
    { id: "r2", content: "Do NOT let drill pipe rotate left — activates emergency release." }
  ],
  cementingProcedures: [
    { id: "c1", content: "Max pumping pressure: 12,500 kPa. Bump plug at 3,500 over circulating." },
    { id: "c2", content: "Pressure up to 30,000 kPa to set packer — HOLD for 10 minutes." }
  ],
  acceptanceCriteria: [
    { id: "a1", content: "Liner hanger sets on first attempt.", status: "ok" },
    { id: "a2", content: "Packer sets: 30,000 kPa held for 10 minutes.", status: "ok" },
    { id: "a3", content: "Backside test (if performed) holds 7,000 kPa for 5 minutes.", status: "wn" }
  ],
  checklist: [
    { id: 1, label: 'All 6 metadata fields filled — no blanks, no TBD, no ASAP.', checked: true },
    { id: 2, label: 'PO / AFE number confirmed with customer before mobilisation.', checked: true },
    { id: 3, label: 'LOM data sheets verified against physical equipment on location.', checked: false },
    { id: 4, label: 'Shear pin values confirmed for all 5 tool groups.', checked: false }
  ],
  edgeCases: [
    { id: 1, test: "Hanger does not hang on first pressure attempt.", expected: "Increase in 500 kPa increments." }
  ]
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Simulate short network delay for UX (feeling of processing)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return the purely static data
    return NextResponse.json(STATIC_JOB_PACK);

  } catch (error: any) {
    console.error("Static Extraction Error:", error);
    return NextResponse.json({ error: "File processing failed" }, { status: 500 });
  }
}

