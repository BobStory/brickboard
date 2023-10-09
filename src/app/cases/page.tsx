import { BsFillGrid3X3GapFill, BsListUl } from 'react-icons/bs'
import './cases.css'

export default function page() {
    return (
        <main className='main-cases'>
            <section className="cases-ui">
                <div className="cases-ui-item">
                    <BsFillGrid3X3GapFill />
                </div>
                <div className="cases-ui-item">
                    <BsListUl />
                </div>
            </section>
            <section className="cases-container">
                <div className="case-head">
                    <div className="head-item">
                        <span className="case-icon-ph"></span>
                        <p>id</p>
                        <p>User</p>
                        <p>Reason</p>
                        <p>Author</p>
                        <p>Duration</p>
                        <p>Created</p>
                    </div>
                </div>
                <div className="case-body">
                    <div className="case-item">
                        <span className="case-status-icon" data-tooltip-id="tooltip" data-tooltip-content="Status Unknown"></span>
                        <p>FHYkEbY</p>
                        <p>946528986354290758</p>
                        <p>Nutzer gesperrt</p>
                        <p>979794367759908934</p>
                        <p data-tooltip-id="tooltip" data-tooltip-content="3 Weeks 4 Days left">4 weeks</p>
                        <p data-tooltip-id="tooltip" data-tooltip-content="3 Days ago">10/7/2023</p>
                    </div>
                    <div className="case-item">
                        <span className="case-status-icon" data-tooltip-id="tooltip" data-tooltip-content="Status Unknown"></span>
                        <p>FHYkEbY</p>
                        <p>946528986354290758</p>
                        <p>Nutzer gesperrt</p>
                        <p>979794367759908934</p>
                        <p data-tooltip-id="tooltip" data-tooltip-content="3 Weeks 4 Days left">4 weeks</p>
                        <p data-tooltip-id="tooltip" data-tooltip-content="3 Days ago">10/7/2023</p>
                    </div>
                    <div className="case-item">
                        <span className="case-status-icon" data-tooltip-id="tooltip" data-tooltip-content="Status Unknown"></span>
                        <p>FHYkEbY</p>
                        <p>946528986354290758</p>
                        <p>Nutzer gesperrt</p>
                        <p>979794367759908934</p>
                        <p data-tooltip-id="tooltip" data-tooltip-content="3 Weeks 4 Days left">4 weeks</p>
                        <p data-tooltip-id="tooltip" data-tooltip-content="3 Days ago">10/7/2023</p>
                    </div>
                </div>
            </section>
        </main>
    )
}