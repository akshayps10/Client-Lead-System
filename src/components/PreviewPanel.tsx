import styles from './PreviewPanel.module.scss';
import { Settings, HelpCircle, Calendar, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function PreviewPanel() {
    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.icons}>
                    <button><Settings size={18} /></button>
                    <button><HelpCircle size={18} /></button>
                    <button><Calendar size={18} /></button>
                    <button><Sparkles size={18} /></button>
                </div>
                <button className={styles.collapse}><ChevronDown size={20} /></button>
            </div>

            <div className={styles.titleSection}>
                <div className={styles.label}>PREVIEW</div>
                <div className={styles.mainInfo}>
                    <div className={styles.icon}>$</div>
                    <div>
                        <h2>45 Components - RTS</h2>
                        <div className={styles.price}>17 344 EUR</div>
                    </div>
                </div>
            </div>

            <div className={styles.details}>
                <div className={styles.row}><span>Company:</span> <span className={styles.link}>SuperCompany Ltd ASA</span></div>
                <div className={styles.row}><span>Contact:</span> <span className={styles.link}>Peter Elliot</span></div>
                <div className={styles.row}><span>Sale date:</span> <span>01/02/2025</span></div>
                <div className={styles.row}><span>Owner:</span> <span>Eric Davies</span></div>
                <div className={styles.row}><span>Sale type:</span> <span>Cross-sale to existing cust...</span></div>
                <div className={styles.row}><span>Status:</span> <span>Open (20%)</span></div>
            </div>

            <hr className={styles.divider} />

            <div className={styles.activities}>
                <h3>Activities</h3>
                <div className={styles.activityList}>
                    <div className={styles.item}>
                        <span className={styles.date}>04/11/2024</span>
                        <span className={styles.desc}>Follow-up call</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.date}>01/11/2024</span>
                        <span className={styles.desc}>Quote for 45 components...</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.date}>23/09/2024</span>
                        <span className={styles.desc}>Prospect meeting</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.date}>22/09/2024</span>
                        <span className={styles.desc}>Introduction call</span>
                    </div>
                </div>
            </div>

            <hr className={styles.divider} />

            <div className={styles.stakeholders}>
                <h3>Stakeholders</h3>
                <div className={styles.list}>
                    <div>James Vargas</div>
                    <div>Lisa Jansson</div>
                </div>
            </div>
        </div>
    );
}
