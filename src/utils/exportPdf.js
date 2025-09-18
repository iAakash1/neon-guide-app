/**
 * Export a learning plan to PDF (lazy-loads html2pdf)
 * @param {Object} plan - The plan data to export
 */
export const exportToPDF = async (plan) => {
  try {
    // Build HTML element for the plan
    const htmlContentElement = generatePlanHTML(plan);

    // Lazy-load html2pdf to avoid bundling it in the main chunk
    const html2pdfModule = await import('html2pdf.js');
    // html2pdf is usually the default export (UMD wrapper), so try .default first
    const html2pdf = html2pdfModule?.default ?? html2pdfModule;

    // PDF generation options
    const options = {
      margin: 1,
      filename: `${(plan.selectedPath || 'learning_plan').replace(/\s+/g, '_')}_Learning_Plan.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf to generate and download PDF from the element
    await html2pdf().set(options).from(htmlContentElement).save();

    return true;
  } catch (error) {
    console.error('PDF Export Error:', error);
    throw new Error('Failed to export PDF');
  }
};

/**
 * Generate HTML content for the PDF export
 * @param {Object} plan - The plan data
 * @returns {HTMLElement} DOM element containing the formatted plan
 */
const generatePlanHTML = (plan) => {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.cssText = `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1a1a1a;
    line-height: 1.6;
    padding: 20px;
    background: white;
  `;

  const calculateProgress = () => {
    if (!plan.milestones) return 0;
    const completed = plan.milestones.filter(m => m.completed).length;
    return Math.round((completed / plan.milestones.length) * 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Header and body HTML (same structure as before)
  container.innerHTML = `
    <div style="border-bottom: 3px solid #1a73e8; padding-bottom: 20px; margin-bottom: 30px;">
      <h1 style="color: #1a73e8; margin: 0; font-size: 32px; font-weight: bold;">
        ${plan.selectedPath || ''}
      </h1>
      <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">
        Personalized Learning Plan • Generated ${formatDate(plan.createdAt || new Date())}
      </p>
    </div>

    <!-- Plan Overview -->
    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
        Plan Overview
      </h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 20px;">
        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
          <div style="font-size: 24px; font-weight: bold; color: #1a73e8;">${calculateProgress()}%</div>
          <div style="color: #666; font-size: 14px;">Progress</div>
        </div>
        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
          <div style="font-size: 24px; font-weight: bold; color: #fbbc05;">${plan.totalDurationMonths || 6}</div>
          <div style="color: #666; font-size: 14px;">Months</div>
        </div>
        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
          <div style="font-size: 24px; font-weight: bold; color: #34a853;">${plan.milestones?.length || 0}</div>
          <div style="color: #666; font-size: 14px;">Milestones</div>
        </div>
        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
          <div style="font-size: 24px; font-weight: bold; color: #ea4335;">$${plan.costEstimate?.mid || 0}</div>
          <div style="color: #666; font-size: 14px;">Est. Cost</div>
        </div>
      </div>
    </div>

    ${plan.costEstimate ? `
    <!-- Investment Options -->
    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
        Investment Options
      </h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
        <div style="padding: 15px; border: 2px solid #34a853; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #34a853; font-size: 18px;">Budget Track</h3>
          <div style="font-size: 24px; font-weight: bold; color: #34a853;">$${plan.costEstimate.low}</div>
          <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">Free and low-cost resources</p>
        </div>
        <div style="padding: 15px; border: 2px solid #1a73e8; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #1a73e8; font-size: 18px;">Balanced Track</h3>
          <div style="font-size: 24px; font-weight: bold; color: #1a73e8;">$${plan.costEstimate.mid}</div>
          <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">Mix of free and paid resources</p>
        </div>
        <div style="padding: 15px; border: 2px solid #ea4335; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #ea4335; font-size: 18px;">Premium Track</h3>
          <div style="font-size: 24px; font-weight: bold; color: #ea4335;">$${plan.costEstimate.high}</div>
          <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">Premium courses and bootcamps</p>
        </div>
      </div>
    </div>
    ` : ''}

    <!-- Learning Timeline -->
    <div style="margin-bottom: 30px;">
      <h2 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
        Learning Timeline
      </h2>
      ${generateMilestonesHTML(plan.milestones || [])}
    </div>

    <!-- Footer -->
    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center;">
      <p style="color: #666; font-size: 14px; margin: 0;">
        Generated by Career Advisor AI • ${formatDate(new Date())}
      </p>
      <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">
        Visit our platform for interactive progress tracking and updates
      </p>
    </div>
  `;

  return container;
};

/**
 * Generate HTML for milestones timeline
 * @param {Array} milestones - Array of milestone objects
 * @returns {string} HTML string for milestones
 */
const generateMilestonesHTML = (milestones) => {
  if (!milestones || milestones.length === 0) {
    return '<p style="color: #666; text-align: center; padding: 20px;">No milestones available.</p>';
  }

  return milestones.map((milestone, index) => `
    <div style="margin-bottom: 25px; padding: 20px; border-left: 4px solid ${milestone.completed ? '#34a853' : '#1a73e8'}; background: ${milestone.completed ? '#f0f8f0' : '#f0f4ff'}; border-radius: 0 8px 8px 0;">
      <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 15px;">
        <div style="flex: 1;">
          <h3 style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 18px;">
            ${milestone.completed ? '✅' : '📋'} ${milestone.title}
          </h3>
          <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">
            Month ${milestone.month}, Week ${milestone.week} • ${milestone.hours} hours
          </p>
          <p style="color: #333; margin: 0; line-height: 1.5;">
            ${milestone.description}
          </p>
        </div>
        <div style="margin-left: 20px; text-align: right;">
          <span style="display: inline-block; padding: 4px 12px; background: ${milestone.completed ? '#34a853' : '#1a73e8'}; color: white; border-radius: 12px; font-size: 12px; font-weight: bold;">
            ${milestone.completed ? 'COMPLETED' : 'PENDING'}
          </span>
        </div>
      </div>
      
      ${milestone.resources && milestone.resources.length > 0 ? `
        <div style="margin-top: 15px;">
          <h4 style="color: #1a1a1a; font-size: 16px; margin: 0 0 10px 0;">Resources:</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px;">
            ${milestone.resources.map(resource => `
              <div style="padding: 10px; background: white; border-radius: 6px; border: 1px solid #e0e0e0;">
                <div style="font-weight: bold; color: #1a73e8; margin-bottom: 5px;">${resource.title}</div>
                <div style="font-size: 12px; color: #666; margin-bottom: 5px;">
                  ${resource.type} • ${resource.cost === 0 ? 'Free' : '$' + resource.cost}
                </div>
                <div style="font-size: 12px; color: #666; word-break: break-all;">${resource.url}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `).join('');
};

// default export kept for compatibility
export default { exportToPDF };
