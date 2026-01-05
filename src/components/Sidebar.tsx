import styles from './Sidebar.module.scss';
import {
    BarChart3,
    Building2,
    User,
    Calendar,
    DollarSign,
    ClipboardList,
    Ticket,
    AtSign,
    PieChart,
    Target,
    Wrench,
    ChevronRight
} from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <span>L</span>
            </div>

            <nav className={styles.nav}>
                <div className={styles.navItem}><BarChart3 size={20} /></div>
                <div className={`${styles.navItem} ${styles.active}`}><Building2 size={20} /></div>
                <div className={styles.navItem}><User size={20} /></div>
                <div className={styles.navItem}><Calendar size={20} /></div>
                <div className={styles.navItem}><DollarSign size={20} /></div>
                <div className={styles.navItem}><ClipboardList size={20} /></div>
                <div className={styles.navItem}><Ticket size={20} /></div>
                <div className={styles.navItem}><AtSign size={20} /></div>
                <div className={styles.navItem}><PieChart size={20} /></div>
                <div className={styles.navItem}><Target size={20} /></div>
                <div className={styles.navItem}><Wrench size={20} /></div>
            </nav>

            <div className={styles.footer}>
                <ChevronRight size={20} />
            </div>
        </aside>
    );
}
