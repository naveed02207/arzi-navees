const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /const handleApplicantChange = \(updated: ApplicantDetails\) => \{/,
  'const handleApplicantChange = useCallback((updated: ApplicantDetails) => {'
);
code = code.replace(
  /    }\n  };\n  const handleSelectDepartment/g,
  '    }\n  }, []);\n  const handleSelectDepartment'
);

code = code.replace(
  /const handleSelectDepartment = \(dept: Department\) => \{/,
  'const handleSelectDepartment = useCallback((dept: Department) => {'
);
code = code.replace(
  /    setSelectedDept\(dept\);\n  \};\n  const handleSelectSamplePrompt/g,
  '    setSelectedDept(dept);\n  }, []);\n  const handleSelectSamplePrompt'
);

code = code.replace(
  /const handleSelectSamplePrompt = \([\s\S]*?\) => \{/,
  'const handleSelectSamplePrompt = useCallback((sampleText: string, _sampleTitle: string) => {'
);
code = code.replace(
  /    setRawComplaint\(sampleText\);\n  \};\n  const handleDraftSubmit/g,
  '    setRawComplaint(sampleText);\n  }, []);\n  const handleDraftSubmit'
);

fs.writeFileSync('src/App.tsx', code);
