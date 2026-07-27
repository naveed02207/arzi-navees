const fs = require('fs');

let comp = fs.readFileSync('src/components/SubmissionGuide.tsx', 'utf8');

comp = comp.replace(
/      case "police":.*?badgeColor: "bg-teal-50 text-teal-700 border-teal-200"\n        };\n    }/s,
`      case "police":
        return {
          submitToOffice: t("guide_police_office") + " " + city,
          submitToPerson: t("guide_police_person"),
          reason: t("guide_police_reason"),
          requiredDocs: (t("guide_police_docs") as string).split(","),
          helpline: "15",
          officeTiming: t("guide_police_timing"),
          website: "https://punjabpolice.gov.pk",
          processingTime: "3–5 Working Days",
          escalation: (t("guide_police_escalation") as string).split(","),
          searchQuery: \`Police Station \${city}\`,
          badgeColor: "bg-red-50 text-red-700 border-red-200"
        };
      case "nadra":
        return {
          submitToOffice: t("guide_nadra_office") + " " + city,
          submitToPerson: t("guide_nadra_person"),
          reason: t("guide_nadra_reason"),
          requiredDocs: (t("guide_nadra_docs") as string).split(","),
          helpline: "7000",
          officeTiming: t("guide_nadra_timing"),
          website: "https://www.nadra.gov.pk",
          processingTime: "7–14 Working Days",
          escalation: (t("guide_nadra_escalation") as string).split(","),
          searchQuery: \`NADRA Office \${city}\`,
          badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
        };
      case "wapda":
        return {
          submitToOffice: t("guide_wapda_office") + " " + city,
          submitToPerson: t("guide_wapda_person"),
          reason: t("guide_wapda_reason"),
          requiredDocs: (t("guide_wapda_docs") as string).split(","),
          helpline: "118",
          officeTiming: t("guide_wapda_timing"),
          website: "http://www.wapda.gov.pk",
          processingTime: "3–5 Working Days",
          escalation: (t("guide_wapda_escalation") as string).split(","),
          searchQuery: \`WAPDA Customer Service \${city}\`,
          badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
        };
      case "education":
        return {
          submitToOffice: t("guide_edu_office") + " " + city,
          submitToPerson: t("guide_edu_person"),
          reason: t("guide_edu_reason"),
          requiredDocs: (t("guide_edu_docs") as string).split(","),
          helpline: "111-11-HEC",
          officeTiming: t("guide_edu_timing"),
          website: "https://www.hec.gov.pk",
          processingTime: "14-30 Working Days",
          escalation: (t("guide_edu_escalation") as string).split(","),
          searchQuery: \`University \${city}\`,
          badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
        };
      case "municipal":
        return {
          submitToOffice: t("guide_muni_office") + " " + city,
          submitToPerson: t("guide_muni_person"),
          reason: t("guide_muni_reason"),
          requiredDocs: (t("guide_muni_docs") as string).split(","),
          helpline: "1199",
          officeTiming: t("guide_muni_timing"),
          website: "https://lgcd.punjab.gov.pk",
          processingTime: "3–7 Working Days",
          escalation: (t("guide_muni_escalation") as string).split(","),
          searchQuery: \`Municipal Committee \${city}\`,
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
        };
      case "general":
      default:
        return {
          submitToOffice: t("guide_gen_office") + " " + city,
          submitToPerson: t("guide_gen_person"),
          reason: t("guide_gen_reason"),
          requiredDocs: (t("guide_gen_docs") as string).split(","),
          helpline: "0800-02345",
          officeTiming: t("guide_gen_timing"),
          website: "https://pakistan.gov.pk",
          processingTime: t("guide_unknown_policy") as string,
          escalation: (t("guide_gen_escalation") as string).split(","),
          searchQuery: \`Deputy Commissioner Office \${city}\`,
          badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
        };
    }`
);

fs.writeFileSync('src/components/SubmissionGuide.tsx', comp);
