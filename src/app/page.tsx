import styles from './Home.module.scss';
import CompanyDetails from '@/components/CompanyDetails';
import SalesTable from '@/components/SalesTable';
import PreviewPanel from '@/components/PreviewPanel';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <CompanyDetails />
                <SalesTable />
            </div>
            <PreviewPanel />
        </div>
    );
}
