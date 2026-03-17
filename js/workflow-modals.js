/* ============================================================
   Workflow Modal — Data + Logic
   Each workflow has customized mockup content for its use case.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    const workflows = {
        'candidate-sourcing': {
            title: 'Automated Candidate Sourcing',
            icon: 'fas fa-search',
            team: 'ta',
            teamLabel: 'Talent Acquisition',
            agents: ['search', 'talk', 'docs'],
            desc: 'Search across multiple platforms, match against job requirements, and build ranked shortlists. Then auto-engage top matches with personalized outreach.',
            steps: [
                'Define job requirements or paste JD',
                'ARIA Search scans ATS, LinkedIn, internal pools',
                'AI ranks candidates with match scores',
                'Build shortlists and trigger outreach',
                'ARIA Talk pre-screens interested candidates',
                'Generate candidate profiles with ARIA Docs'
            ],
            mockup: 'search',
            searchQuery: 'Java developer, 5+ yrs, remote eligible',
            searchResults: [
                { score: '97%', label: 'Sarah Chen', detail: 'Sr. Java Dev · 8 yrs · Available' },
                { score: '91%', label: 'Marcus Rivera', detail: 'Full-Stack Java · 6 yrs · Open to remote' },
                { score: '84%', label: 'Priya Sharma', detail: 'Java/Kotlin · 5 yrs · Interviewing' }
            ],
            link: 'workflows/talent-acquisition.html'
        },
        'screening-matching': {
            title: 'Screening & Matching',
            icon: 'fas fa-phone-alt',
            team: 'ta',
            teamLabel: 'Talent Acquisition',
            agents: ['talk', 'search', 'docs'],
            desc: 'AI-powered screening calls with real-time qualification scoring, automated profile generation, and instant matching to open reqs.',
            steps: [
                'Define screening criteria and scoring rubric',
                'Send screening links to candidates',
                'ARIA Talk conducts voice/video screening',
                'Real-time scoring across experience, skills, culture fit',
                'Match qualified candidates to open positions',
                'Generate scored profiles and route to hiring managers'
            ],
            mockup: 'talk',
            talkBubble: 'Tell me about your experience with microservices architecture and cloud deployments.',
            link: 'workflows/talent-acquisition.html'
        },
        'candidate-onboarding': {
            title: 'Candidate Onboarding',
            icon: 'fas fa-user-check',
            team: 'ta',
            teamLabel: 'Talent Acquisition',
            agents: ['talk', 'docs'],
            desc: 'End-to-end onboarding from document collection to system provisioning in a single AI-guided conversation.',
            steps: [
                'Configure required documents and forms',
                'Send onboarding link to new hire',
                'ARIA Talk collects ID, W-4, NDA, I-9 conversationally',
                'AI validates all documents in real-time',
                'Capture e-signatures digitally',
                'Auto-provision systems and notify hiring manager'
            ],
            mockup: 'talk',
            talkBubble: "Welcome aboard! Let\u2019s get your paperwork done. Can you upload your government-issued ID?",
            link: 'workflows/talent-acquisition.html'
        },
        'pool-management': {
            title: 'Pool Management',
            icon: 'fas fa-database',
            team: 'ta',
            teamLabel: 'Talent Acquisition',
            agents: ['search', 'talk'],
            desc: 'Keep your talent pools fresh with automated re-engagement, availability tracking, and pool quality scoring.',
            steps: [
                'Define pool criteria and refresh cadence',
                'ARIA Search finds new matching candidates',
                'Track candidate availability and interest',
                'ARIA Talk re-engages stale contacts',
                'Maintain pool freshness and quality scores'
            ],
            mockup: 'search',
            searchQuery: 'Available .NET developers in talent pool',
            searchResults: [
                { score: '94%', label: 'Alex Kim — Available Now', detail: '.NET Core · Last contacted 3 days ago' },
                { score: '87%', label: 'Jordan Lee — Open', detail: '.NET/Azure · Last contacted 2 weeks ago' },
                { score: '62%', label: 'Taylor Morgan — Stale', detail: '.NET · Last contacted 90+ days ago' }
            ],
            link: 'workflows/talent-acquisition.html'
        },
        'client-outreach': {
            title: 'Client Outreach',
            icon: 'fas fa-bullhorn',
            team: 'ta',
            teamLabel: 'Talent Acquisition',
            agents: ['docs', 'talk'],
            desc: 'Multi-channel outreach with personalized candidate marketing, automated follow-ups, and pipeline tracking.',
            steps: [
                'Select candidates for client presentation',
                'ARIA Docs generates personalized marketing profiles',
                'Send multi-channel outreach (email, call)',
                'ARIA Talk follows up with interested clients',
                'Track pipeline from outreach to placement'
            ],
            mockup: 'docs',
            docTitle: 'Candidate Marketing Profile',
            docScore: 96,
            docTags: ['Skills Verified', 'References Complete', 'Available Immediately'],
            docSources: 'ATS profile · 3 references · Skills assessment',
            link: 'workflows/talent-acquisition.html'
        },
        'agentic-matching': {
            title: 'Agentic Matching',
            icon: 'fas fa-link',
            team: 'ta',
            teamLabel: 'Talent Acquisition',
            agents: ['search'],
            desc: 'AI-driven matching engine connecting candidates to openings with compatibility scoring.',
            steps: [
                'Ingest job descriptions and candidate profiles',
                'AI analyzes skills, experience, preferences',
                'Generate compatibility scores for all matches',
                'Surface top matches with explanation',
                'Auto-notify recruiters of strong fits'
            ],
            mockup: 'search',
            searchQuery: 'Match: Senior PM role #2847',
            searchResults: [
                { score: '96%', label: 'Emily Zhang — Strong Fit', detail: '8 yrs PM · Agile certified · Industry match' },
                { score: '89%', label: 'David Park — Good Fit', detail: '6 yrs PM · PMP · Adjacent industry' },
                { score: '78%', label: 'Lisa Nguyen — Partial Fit', detail: '4 yrs PM · Transitioning from dev' }
            ],
            link: 'workflows/talent-acquisition.html'
        },
        'reference-checks': {
            title: 'Reference Checks',
            icon: 'fas fa-clipboard-check',
            team: 'ta',
            teamLabel: 'Talent Acquisition',
            agents: ['talk', 'docs'],
            desc: 'Automated reference collection via AI-guided conversations with structured scoring and documentation.',
            steps: [
                'Collect reference contact information from candidate',
                'ARIA Talk contacts references via preferred channel',
                'Structured conversation with scoring rubric',
                'Verify employment history and competencies',
                'Generate reference check report with scores'
            ],
            mockup: 'talk',
            talkBubble: 'How would you rate their problem-solving ability? Can you share a specific example?',
            link: 'workflows/talent-acquisition.html'
        },
        'supplier-onboarding': {
            title: 'Supplier Onboarding',
            icon: 'fas fa-handshake',
            team: 'procurement',
            teamLabel: 'Procurement',
            agents: ['talk', 'docs'],
            desc: 'Complete supplier intake, document collection, and compliance verification \u2014 compressed from 60 days to a single AI-guided conversation.',
            steps: [
                'Create supplier onboarding request with required documents',
                'Send intake link to supplier contact',
                'ARIA Talk collects tax forms, banking info, insurance conversationally',
                'AI validates all documents in real-time',
                'Capture e-signatures on contracts and NDAs',
                'Auto-populate ERP vendor master with validated data'
            ],
            mockup: 'talk',
            talkBubble: "Let\u2019s verify your company details. Can you upload your W-9 and certificate of insurance?",
            link: 'workflows/procurement.html'
        },
        'document-audits': {
            title: 'Document Audits',
            icon: 'fas fa-file-invoice',
            team: 'procurement',
            teamLabel: 'Procurement',
            agents: ['search', 'docs'],
            desc: 'Automated document scanning, expiry tracking, and proactive renewal collection across your entire vendor base.',
            steps: [
                'Connect document repositories and vendor records',
                'ARIA Search scans all documents for completeness',
                'Track expiry dates across insurance, certifications, licenses',
                'Flag missing, expired, or soon-to-expire documents',
                'ARIA Talk proactively contacts suppliers for renewals',
                'Generate audit-ready compliance reports'
            ],
            mockup: 'search',
            searchQuery: 'Expiring vendor documents, next 30 days',
            searchResults: [
                { score: '\u26A0', label: 'Acme Corp \u2014 GL Insurance', detail: 'Expires Apr 12 \u00b7 Renewal requested', scoreColor: 'warning' },
                { score: '\u2718', label: 'Beta LLC \u2014 W-9', detail: 'Expired Mar 1 \u00b7 Missing renewal', scoreColor: 'danger' },
                { score: '\u2714', label: 'Gamma Inc \u2014 COI', detail: 'Valid through Dec 2026', scoreColor: 'success' }
            ],
            link: 'workflows/procurement.html'
        },
        'vendor-scorecards': {
            title: 'Vendor Scorecards',
            icon: 'fas fa-chart-bar',
            team: 'procurement',
            teamLabel: 'Procurement',
            agents: ['search', 'talk', 'docs'],
            desc: 'Automated performance tracking, feedback collection, and scorecard generation for all active vendors.',
            steps: [
                'Define scorecard criteria (quality, timeliness, compliance)',
                'ARIA Search aggregates performance data from systems',
                'ARIA Talk collects stakeholder feedback conversationally',
                'AI generates weighted performance scores',
                'Compare vendors across consistent criteria',
                'Generate quarterly scorecard reports'
            ],
            mockup: 'docs',
            docTitle: 'Q1 Vendor Performance Scorecard',
            docScore: 87,
            docTags: ['Quality: 94%', 'On-Time: 87%', 'Compliance: 100%'],
            docSources: 'VMS data \u00b7 6 stakeholder reviews \u00b7 Compliance records',
            link: 'workflows/procurement.html'
        },
        'risk-assessment': {
            title: 'Risk Assessment',
            icon: 'fas fa-shield-alt',
            team: 'procurement',
            teamLabel: 'Procurement',
            agents: ['search', 'talk'],
            desc: 'Comprehensive vendor risk assessment with sanctions screening, adverse media checks, and continuous monitoring.',
            steps: [
                'Define risk assessment criteria and thresholds',
                'ARIA Search runs sanctions and regulatory screening',
                'Check adverse media and public records',
                'ARIA Talk conducts due diligence interviews',
                'AI scores risk across financial, compliance, operational dimensions',
                'Generate risk assessment reports with recommendations'
            ],
            mockup: 'search',
            searchQuery: 'Vendor risk screening: Acme Corp',
            searchResults: [
                { score: '\u2714', label: 'OFAC Sanctions', detail: 'No matches found \u00b7 Clear', scoreColor: 'success' },
                { score: '\u26A0', label: 'Adverse Media', detail: '1 flagged article \u00b7 Review needed', scoreColor: 'warning' },
                { score: '\u2714', label: 'Financial Stability', detail: 'D&B score: 82 \u00b7 Low risk', scoreColor: 'success' }
            ],
            link: 'workflows/procurement.html'
        },
        'timesheet-audits': {
            title: 'Timesheet Audits',
            icon: 'fas fa-clock',
            team: 'procurement',
            teamLabel: 'Procurement',
            agents: ['search', 'talk'],
            desc: 'Automated timesheet reconciliation, billing verification, and discrepancy flagging across all vendors.',
            steps: [
                'Ingest timesheets and billing records from VMS/HRIS',
                'ARIA Search cross-references against contracts and SOWs',
                'Flag rate discrepancies, overtime violations, duplicate entries',
                'ARIA Talk contacts vendors to resolve discrepancies',
                'Generate reconciliation reports',
                'Track resolution and savings'
            ],
            mockup: 'search',
            searchQuery: 'Timesheet discrepancies, March 2026',
            searchResults: [
                { score: '\u2718', label: 'Rate override \u2014 Vendor #1042', detail: '$85/hr billed vs $75/hr contracted \u00b7 $1,200 delta', scoreColor: 'danger' },
                { score: '\u26A0', label: 'OT violation \u2014 Vendor #1087', detail: '52 hrs logged, 40 hr cap \u00b7 Needs approval', scoreColor: 'warning' },
                { score: '\u2714', label: 'Matched \u2014 Vendor #1023', detail: '160 hrs \u00b7 $12,800 \u00b7 Reconciled', scoreColor: 'success' }
            ],
            link: 'workflows/procurement.html'
        },
        'sow-compliance': {
            title: 'SOW Compliance Review',
            icon: 'fas fa-file-contract',
            team: 'procurement',
            teamLabel: 'Procurement',
            agents: ['search', 'docs'],
            desc: 'Automated statement of work and contract compliance verification with AI-powered clause analysis.',
            steps: [
                'Ingest SOWs, contracts, and amendments',
                'ARIA Search extracts key terms, obligations, and deadlines',
                'Cross-reference deliverables against actual performance',
                'Flag compliance gaps and obligation risks',
                'Generate compliance summary reports',
                'Track contract renewal dates and terms'
            ],
            mockup: 'docs',
            docTitle: 'SOW Compliance Analysis',
            docScore: 78,
            docTags: ['12 of 14 Terms Met', '2 Gaps Flagged', 'Renewal: 60 days'],
            docSources: 'SOW v2.1 \u00b7 3 amendments \u00b7 Performance logs',
            link: 'workflows/procurement.html'
        },
        'exit-interviews': {
            title: 'Exit Interviews',
            icon: 'fas fa-door-open',
            team: 'peopleops',
            teamLabel: 'People Operations',
            agents: ['talk', 'docs'],
            desc: 'AI-conducted exit interviews with empathetic conversation, sentiment analysis, theme extraction, and anonymized trend reporting.',
            steps: [
                'Configure exit interview questions by department/role',
                'Schedule conversation with departing employee',
                'ARIA Talk conducts structured, empathetic interview',
                'Real-time sentiment analysis and theme tagging',
                'Collect offboarding documents and return confirmations',
                'Generate anonymized insights for leadership'
            ],
            mockup: 'talk',
            talkBubble: 'What aspects of the work environment could we improve for future team members?',
            link: 'workflows/people-operations.html'
        },
        'engagement-surveys': {
            title: 'Engagement Surveys',
            icon: 'fas fa-poll',
            team: 'peopleops',
            teamLabel: 'People Operations',
            agents: ['talk', 'docs'],
            desc: 'Conversational pulse surveys that capture richer data than forms \u2014 with 90%+ completion rates.',
            steps: [
                'Define survey questions and target audience',
                'ARIA Talk initiates conversations at scheduled intervals',
                'Natural dialogue captures nuanced responses',
                'AI analyzes sentiment, themes, and trends in real-time',
                'Generate actionable insight dashboards',
                'Flag urgent issues for immediate attention'
            ],
            mockup: 'talk',
            talkBubble: 'On a scale of 1\u201310, how supported do you feel by your manager this quarter?',
            link: 'workflows/people-operations.html'
        },
        'performance-reviews': {
            title: '360\u00b0 Performance Reviews',
            icon: 'fas fa-sync-alt',
            team: 'peopleops',
            teamLabel: 'People Operations',
            agents: ['talk', 'docs'],
            desc: 'AI-facilitated multi-rater reviews with structured feedback collection, aggregation, and bias-aware reporting.',
            steps: [
                'Define review criteria and select reviewers',
                'ARIA Talk collects feedback from peers, reports, managers',
                'Structured conversation ensures consistent data',
                'AI aggregates feedback and identifies patterns',
                'Generate comprehensive review reports',
                'Highlight development opportunities'
            ],
            mockup: 'talk',
            talkBubble: 'How effectively does this person collaborate across teams? Can you share an example?',
            link: 'workflows/people-operations.html'
        },
        'internal-mobility': {
            title: 'Internal Mobility',
            icon: 'fas fa-exchange-alt',
            team: 'peopleops',
            teamLabel: 'People Operations',
            agents: ['search', 'talk', 'docs'],
            desc: 'Match internal talent to open roles, manage bench resources, and facilitate redeployment.',
            steps: [
                'Ingest internal skills profiles and open positions',
                'ARIA Search matches employees to opportunities',
                'ARIA Talk conducts interest and availability checks',
                'Coordinate with hiring managers on internal transfers',
                'Track bench utilization and redeployment rates'
            ],
            mockup: 'search',
            searchQuery: 'Internal match: Product Manager openings',
            searchResults: [
                { score: '94%', label: 'Maria Santos \u2014 Sr. Analyst', detail: 'PM certification \u00b7 3 yrs internal \u00b7 Interested' },
                { score: '86%', label: 'James Wilson \u2014 Tech Lead', detail: 'Cross-functional exp \u00b7 5 yrs internal \u00b7 On bench' },
                { score: '73%', label: 'Aisha Patel \u2014 UX Designer', detail: 'Product interest \u00b7 2 yrs internal \u00b7 Exploring' }
            ],
            link: 'workflows/people-operations.html'
        },
        'checkins-30-60-90': {
            title: '30/60/90 Check-Ins',
            icon: 'fas fa-calendar-check',
            team: 'peopleops',
            teamLabel: 'People Operations',
            agents: ['talk', 'docs'],
            desc: 'Automated new hire check-ins at milestone intervals with structured feedback and at-risk flagging.',
            steps: [
                'Define check-in questions for 30, 60, and 90 day milestones',
                'ARIA Talk auto-schedules and conducts check-ins',
                'Collect feedback on onboarding, role clarity, manager support',
                'AI scores new hire sentiment and engagement',
                'Flag at-risk hires for manager intervention',
                'Generate progress trend reports'
            ],
            mockup: 'talk',
            talkBubble: "You\u2019re at your 30-day mark \u2014 how clear are you on your role and day-to-day responsibilities?",
            link: 'workflows/people-operations.html'
        },
        'global-resource-tracking': {
            title: 'Global Resource Tracking',
            icon: 'fas fa-globe',
            team: 'cross',
            teamLabel: 'Cross-Functional',
            agents: ['talk', 'search'],
            desc: 'Real-time visibility across all resources, regions, and 74+ languages.',
            steps: [
                'Connect resource databases across regions',
                'ARIA Search provides real-time resource visibility',
                'Track availability, utilization, and location',
                'ARIA Talk conducts multi-language check-ins',
                'Generate global resource dashboards'
            ],
            mockup: 'search',
            searchQuery: 'Available resources: APAC region',
            searchResults: [
                { score: '12', label: 'Singapore \u2014 Available', detail: '12 resources \u00b7 85% utilization \u00b7 3 on bench' },
                { score: '8', label: 'Tokyo \u2014 Available', detail: '8 resources \u00b7 92% utilization \u00b7 1 on bench' },
                { score: '5', label: 'Sydney \u2014 Available', detail: '5 resources \u00b7 78% utilization \u00b7 2 on bench' }
            ],
            link: 'workflows/conversational.html'
        },
        'conversational-training': {
            title: 'Conversational Training',
            icon: 'fas fa-graduation-cap',
            team: 'cross',
            teamLabel: 'Cross-Functional',
            agents: ['talk', 'docs'],
            desc: 'AI-delivered training with real-time comprehension testing and certification.',
            steps: [
                'Upload training content and define assessment criteria',
                'Assign training to participants',
                'ARIA Talk presents content conversationally',
                'Real-time comprehension checks and adaptive follow-up',
                'Issue certifications on completion',
                'Generate compliance reports'
            ],
            mockup: 'talk',
            talkBubble: "Let\u2019s review the compliance module. What are the three key reporting requirements?",
            link: 'workflows/conversational.html'
        },
        'compliance-tracking': {
            title: 'Compliance Tracking',
            icon: 'fas fa-certificate',
            team: 'cross',
            teamLabel: 'Cross-Functional',
            agents: ['talk', 'search', 'docs'],
            desc: 'Automated compliance certification tracking with renewal reminders.',
            steps: [
                'Connect compliance databases and certification records',
                'ARIA Search tracks all certifications and expiry dates',
                'Auto-generate renewal reminders',
                'ARIA Talk conducts certification verification conversations',
                'Generate audit-ready compliance reports'
            ],
            mockup: 'search',
            searchQuery: 'Expiring certifications, next 60 days',
            searchResults: [
                { score: '\u26A0', label: 'SOC 2 Type II \u2014 Vendor A', detail: 'Expires May 15 \u00b7 Renewal in progress', scoreColor: 'warning' },
                { score: '\u2718', label: 'ISO 27001 \u2014 Vendor C', detail: 'Expired Feb 28 \u00b7 Awaiting re-certification', scoreColor: 'danger' },
                { score: '\u2714', label: 'HIPAA BAA \u2014 Vendor B', detail: 'Valid through Jan 2027', scoreColor: 'success' }
            ],
            link: 'workflows/conversational.html'
        }
    };

    // Team badge classes
    const teamBadgeClass = {
        ta: 'ta',
        procurement: 'procurement',
        peopleops: 'peopleops',
        cross: 'cross'
    };

    // Generate agent pills HTML
    function agentPillsHTML(agents) {
        const labels = { talk: 'Talk', search: 'Search', docs: 'Docs' };
        const icons = { talk: 'fa-microphone-alt', search: 'fa-search', docs: 'fa-file-alt' };
        return agents.map(a =>
            `<span class="agent-pill ${a}"><i class="fas ${icons[a]}"></i> ${labels[a]}</span>`
        ).join('');
    }

    // Score badge color helper
    function scoreBadgeStyle(result) {
        if (result.scoreColor === 'warning') return 'background:var(--amber-100,#FEF3C7);color:var(--amber-700,#B45309)';
        if (result.scoreColor === 'danger') return 'background:var(--red-100,#FEE2E2);color:var(--red-600,#DC2626)';
        if (result.scoreColor === 'success') return 'background:var(--green-100,#DCFCE7);color:var(--green-700,#15803D)';
        return 'background:var(--aria-light-green);color:var(--aria-green-dark)';
    }

    // Generate mockup HTML based on type
    function mockupHTML(type, wf) {
        if (type === 'talk') {
            const bubble = wf.talkBubble || wf.steps[2] || wf.steps[1];
            return `
                <div class="browser-chrome">
                    <div class="browser-bar">
                        <div class="browser-dots"><span></span><span></span><span></span></div>
                        <div class="browser-url"><i class="fas fa-lock"></i> talk.aria-orchestration.com/session</div>
                    </div>
                    <div class="browser-body" style="padding:20px;background:linear-gradient(135deg,#FAF8F6,#F0ECE8);text-align:center">
                        <div style="display:inline-flex;align-items:center;gap:6px;background:white;padding:3px 10px;border-radius:999px;font-size:9px;font-weight:700;color:var(--gray-600);margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,0.06)"><span style="width:6px;height:6px;background:var(--red-500);border-radius:50%;display:inline-block"></span> LIVE</div>
                        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--aria-green),var(--aria-green-dark));margin:0 auto 8px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:white;border:2px solid rgba(255,255,255,0.8)">AI</div>
                        <div style="font-size:11px;font-weight:600;color:var(--aria-navy);margin-bottom:2px">ARIA Talk</div>
                        <div style="font-size:9px;color:var(--gray-500);margin-bottom:10px">${wf.title}</div>
                        <div style="display:flex;align-items:center;gap:2px;justify-content:center;height:20px;margin-bottom:10px">
                            <div style="width:3px;height:6px;background:var(--aria-green);border-radius:1px;animation:waveAnim 1.2s ease-in-out infinite"></div>
                            <div style="width:3px;height:14px;background:var(--aria-green);border-radius:1px;animation:waveAnim 1.2s ease-in-out infinite 0.2s"></div>
                            <div style="width:3px;height:10px;background:var(--aria-green);border-radius:1px;animation:waveAnim 1.2s ease-in-out infinite 0.1s"></div>
                            <div style="width:3px;height:18px;background:var(--aria-green);border-radius:1px;animation:waveAnim 1.2s ease-in-out infinite 0.3s"></div>
                            <div style="width:3px;height:8px;background:var(--aria-green);border-radius:1px;animation:waveAnim 1.2s ease-in-out infinite 0.15s"></div>
                        </div>
                        <div style="background:white;border:1px solid var(--gray-200);border-radius:8px;padding:8px 12px;font-size:10px;color:var(--gray-600);font-style:italic;max-width:220px;margin:0 auto">"${bubble}"</div>
                    </div>
                </div>`;
        } else if (type === 'search') {
            const query = wf.searchQuery || wf.title;
            const results = wf.searchResults || [
                { score: '95%', label: 'Top Match', detail: 'High confidence \u00b7 Verified' },
                { score: '88%', label: 'Strong Match', detail: 'Good fit \u00b7 Review needed' },
                { score: '76%', label: 'Potential Match', detail: 'Partial fit \u00b7 Flagged' }
            ];
            const resultCards = results.map(r => {
                const style = scoreBadgeStyle(r);
                return `<div style="background:white;border:1px solid var(--gray-200);border-radius:8px;padding:8px 10px;margin-bottom:6px;display:flex;align-items:center;gap:8px">
                            <div style="width:28px;height:28px;min-width:28px;border-radius:6px;${style};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">${r.score}</div>
                            <div><div style="font-size:11px;font-weight:600;color:var(--aria-navy)">${r.label}</div><div style="font-size:9px;color:var(--gray-500)">${r.detail}</div></div>
                        </div>`;
            }).join('');
            const countText = results.length + ' results found \u00b7 2.4s';
            return `
                <div class="browser-chrome">
                    <div class="browser-bar">
                        <div class="browser-dots"><span></span><span></span><span></span></div>
                        <div class="browser-url"><i class="fas fa-lock"></i> platform.aria-orchestration.com/search</div>
                    </div>
                    <div class="browser-body" style="padding:16px;background:var(--gray-50)">
                        <div style="display:flex;align-items:center;gap:8px;background:white;border:1px solid var(--gray-200);border-radius:8px;padding:8px 12px;margin-bottom:10px">
                            <i class="fas fa-search" style="color:var(--gray-400);font-size:11px"></i>
                            <span style="font-size:11px;color:var(--aria-navy);font-weight:500">${query}</span>
                        </div>
                        <div style="font-size:9px;color:var(--gray-500);margin-bottom:8px">${countText}</div>
                        ${resultCards}
                    </div>
                </div>`;
        } else {
            // docs mockup
            const docTitle = wf.docTitle || (wf.title + ' Report');
            const docScore = wf.docScore || 92;
            const docTags = wf.docTags || ['Verified', 'Complete', 'Compliant'];
            const docSources = wf.docSources || '3 data sources \u00b7 12 citations \u00b7 Full audit trail';
            const tagsHTML = docTags.map(t =>
                `<span style="padding:2px 8px;background:var(--aria-light-green);color:var(--aria-green-dark);border-radius:999px;font-size:9px;font-weight:500">${t}</span>`
            ).join('');
            return `
                <div class="browser-chrome">
                    <div class="browser-bar">
                        <div class="browser-dots"><span></span><span></span><span></span></div>
                        <div class="browser-url"><i class="fas fa-lock"></i> platform.aria-orchestration.com/docs</div>
                    </div>
                    <div class="browser-body" style="padding:16px;background:var(--gray-50)">
                        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--gray-200)">
                            <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--aria-green),var(--aria-green-dark));color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700"><i class="fas fa-file-alt"></i></div>
                            <div>
                                <div style="font-size:11px;font-weight:600;color:var(--aria-navy)">${docTitle}</div>
                                <div style="font-size:9px;color:var(--gray-500)">Auto-generated \u00b7 ARIA Docs</div>
                            </div>
                            <div style="margin-left:auto;width:36px;height:36px;border-radius:50%;background:conic-gradient(var(--aria-green) 0% ${docScore}%,var(--gray-200) ${docScore}% 100%);display:flex;align-items:center;justify-content:center;position:relative">
                                <div style="width:28px;height:28px;border-radius:50%;background:var(--gray-50);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--aria-green-dark)">${docScore}</div>
                            </div>
                        </div>
                        <div style="margin-bottom:8px">
                            <div style="font-size:9px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Summary</div>
                            <div style="font-size:10px;color:var(--gray-600);line-height:1.5">${wf.desc.substring(0, 80)}...</div>
                        </div>
                        <div style="margin-bottom:8px">
                            <div style="font-size:9px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Key Findings</div>
                            <div style="display:flex;gap:4px;flex-wrap:wrap">${tagsHTML}</div>
                        </div>
                        <div>
                            <div style="font-size:9px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Sources</div>
                            <div style="font-size:9px;color:var(--gray-500)">${docSources}</div>
                        </div>
                    </div>
                </div>`;
        }
    }

    // Build modal HTML
    function buildModal(wf) {
        const stepsHTML = wf.steps.map((s, i) =>
            `<div class="wf-step"><div class="wf-step-num">${i + 1}</div><p>${s}</p></div>`
        ).join('');

        return `
            <button class="wf-modal-close"><i class="fas fa-times"></i></button>
            <div class="wf-modal-header">
                <div class="wf-modal-icon"><i class="${wf.icon}"></i></div>
                <div class="wf-modal-title">
                    <h2>${wf.title}</h2>
                    <div class="agent-pills">${agentPillsHTML(wf.agents)}</div>
                </div>
                <span class="team-badge ${teamBadgeClass[wf.team]}">${wf.teamLabel}</span>
            </div>
            <p class="wf-modal-desc">${wf.desc}</p>
            <div class="wf-modal-body">
                <div class="wf-modal-steps">
                    <h4>How It Works</h4>
                    <div class="wf-steps">${stepsHTML}</div>
                </div>
                <div class="wf-modal-mockup">
                    ${mockupHTML(wf.mockup, wf)}
                </div>
            </div>
            <div class="wf-modal-footer">
                <a href="${wf.link}">View all ${wf.teamLabel} workflows <i class="fas fa-arrow-right"></i></a>
            </div>`;
    }

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'wf-modal-overlay';
    overlay.innerHTML = '<div class="wf-modal"></div>';
    document.body.appendChild(overlay);

    const modal = overlay.querySelector('.wf-modal');

    // Open modal
    function openModal(workflowId) {
        const wf = workflows[workflowId];
        if (!wf) return;
        modal.innerHTML = buildModal(wf);
        document.body.style.overflow = 'hidden';
        overlay.classList.add('open');

        // Bind close button
        modal.querySelector('.wf-modal-close').addEventListener('click', closeModal);
    }

    // Close modal
    function closeModal() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Attach click handlers to workflow cards
    document.querySelectorAll('.workflow-card[data-workflow]').forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.workflow);
        });
    });

});
