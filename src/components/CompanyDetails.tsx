import styles from './CompanyDetails.module.scss';
import { Mail, MapPin, Phone, Globe, Edit2, MoreHorizontal, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function CompanyDetails() {
    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.companyInfo}>
                    <div className={styles.logo}>
                        <img src="/logo.png" alt="SuperCompany Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div>
                        <h1 className={styles.companyName}>
                            SuperCompany Ltd ASA <Star size={16} className={styles.star} />
                        </h1>
                        <p className={styles.subtext}>Department Stockholm</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button className={styles.editBtn}><Edit2 size={16} /></button>
                    <button className={styles.moreBtn}><MoreHorizontal size={16} /></button>
                </div>
            </div>

            {/* Info Tabs (Company, More, Interest, etc.) */}
            <div className={styles.topTabs}>
                <span className={`${styles.tab} ${styles.active}`}>Company</span>
                <span className={styles.tab}>More</span>
                <span className={styles.tab}>Interest</span>
                <span className={styles.tab}>Note</span>
                <span className={styles.tab}>Market data</span>
                <span className={styles.tab}>Misc</span>
            </div>

            <hr className={styles.divider} />

            {/* Info Grid */}
            <div className={styles.infoGrid}>
                <div className={styles.col}>
                    <div className={styles.row}><span className={styles.label}>Postal:</span> <span className={styles.link}>Västgötagatan 5, 102 61 Stock..</span></div>
                    <div className={styles.row}><span className={styles.label}>Country:</span> <span>Sweden</span></div>
                    <div className={styles.row}><span className={styles.label}>Phone:</span> <span className={styles.link}>+46 800 193 2820</span> <span className={styles.sub}>Main</span></div>
                    <div className={styles.row}><span className={styles.label}>Webaddress:</span> <span className={styles.link}>info@sc.se</span></div>
                    <div className={styles.row}><span className={styles.label}>E-mail:</span> <span className={styles.link}>www.sc.se</span></div>
                </div>
                <div className={styles.col}>
                    <div className={styles.row}><span className={styles.label}>Category:</span> <span>Customer A</span></div>
                    <div className={styles.row}><span className={styles.label}>Code:</span> <span>SUPERCO</span></div>
                    <div className={styles.row}><span className={styles.label}>Number:</span> <span>2002</span></div>
                    <div className={styles.row}><span className={styles.label}>VAT No.:</span> <span>SE123456789</span></div>
                    <div className={styles.row}><span className={styles.label}>Business:</span> <span>IT</span></div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.checkboxes}>
                    <label><input type="checkbox" checked readOnly /> Stop</label>
                    <label><input type="checkbox" /> No mailings</label>
                </div>
                <div className={styles.meta}>
                    <span>Updated: 18/09/2023 OG</span>
                    <div className={styles.nav}>
                        <button><ChevronLeft size={16} /></button>
                        <button><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
