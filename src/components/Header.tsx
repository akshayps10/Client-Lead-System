import styles from './Header.module.scss';
import { Search, Bell, HelpCircle, Menu, Layout, ChevronDown, User, Building2, ListFilter } from 'lucide-react';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.newButtonGroup}>
                    <button className={styles.newMain}>
                        <Building2 size={18} /> New
                    </button>
                    <div className={styles.separator}></div>
                    <button className={styles.newArrow}>
                        <ChevronDown size={16} />
                    </button>
                </div>
                <button className={styles.circleBtn}>
                    <ListFilter size={18} />
                </button>
            </div>

            <div className={styles.search}>
                <Search size={18} className={styles.searchIcon} />
                <input type="text" placeholder="Search for anything" />
            </div>

            <div className={styles.right}>
                <div className={styles.notification}>
                    <Bell size={20} />
                    <span className={styles.badge}>3</span>
                </div>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <User size={18} />
                    </div>
                </div>
                <button className={styles.iconBtn}><Menu size={20} /></button>
                <div className={styles.help}>
                    Help
                </div>
                <button className={styles.iconBtn}><Layout size={20} /></button>
            </div>
        </header>
    );
}
