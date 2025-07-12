import React from 'react';
import styles from './strategy.module.scss';

const Strategy = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>Trading Strategies Guide</h1>

                <div className={styles.strategySection}>
                    <h2 className={styles.strategyTitle}>📊 Over/Under Strategy</h2>

                    <div className={`${styles.strategyCard} ${styles.overCard}`}>
                        <h3 className={styles.subTitle}>🟢 Over Strategy</h3>
                        <ul className={styles.strategyList}>
                            <li><span className={styles.highlight}>Green bar must be above</span> your prediction</li>
                            <li><span className={styles.highlight}>Red bar must be below</span> your prediction</li>
                            <li><span className={styles.highlight}>Entry point:</span> Use any digit <span className={styles.highlight}>below</span> your prediction</li>
                        </ul>
                        <div className={styles.example}>
                            <p>Example: If predicting 75, enter at 70 or lower</p>
                        </div>
                    </div>

                    <div className={`${styles.strategyCard} ${styles.underCard}`}>
                        <h3 className={styles.subTitle}>🔴 Under Strategy</h3>
                        <ul className={styles.strategyList}>
                            <li><span className={styles.highlight}>Green bar must be below</span> your prediction</li>
                            <li><span className={styles.highlight}>Red bar must be above</span> your prediction</li>
                            <li><span className={styles.highlight}>Entry point:</span> Use any digit <span className={styles.highlight}>above</span> your prediction</li>
                        </ul>
                        <div className={styles.example}>
                            <p>Example: If predicting 25, enter at 30 or higher</p>
                        </div>
                    </div>
                </div>

                <div className={styles.strategySection}>
                    <h2 className={styles.strategyTitle}>🔢 Even/Odd Strategy</h2>
                    <p className={styles.note}>With Even/Odd you consider both the red and green bar.</p>

                    <div className={`${styles.strategyCard} ${styles.evenCard}`}>
                        <h3 className={styles.subTitle}>🔵 Even Strategy</h3>
                        <ul className={styles.strategyList}>
                            <li>Both the <span className={styles.highlight}>red bar and green bar</span> should be on <span className={styles.highlight}>even numbers</span></li>
                            <li>There should be at least <span className={styles.highlight}>3 even numbers</span> with more than 10%</li>
                        </ul>
                        <div className={styles.example}>
                            <p>Example: Bars at 22 (even) and 36 (even) with multiple other strong even numbers</p>
                        </div>
                    </div>

                    <div className={`${styles.strategyCard} ${styles.oddCard}`}>
                        <h3 className={styles.subTitle}>🟣 Odd Strategy</h3>
                        <ul className={styles.strategyList}>
                            <li>Both the <span className={styles.highlight}>red bar and green bar</span> should be on <span className={styles.highlight}>odd numbers</span></li>
                            <li>There should be at least <span className={styles.highlight}>3 odd numbers</span> with more than 10%</li>
                        </ul>
                        <div className={styles.example}>
                            <p>Example: Bars at 35 (odd) and 47 (odd) with multiple other strong odd numbers</p>
                        </div>
                    </div>

                    <div className={styles.importantNote}>
                        <div className={styles.warningIcon}>⚠️</div>
                        <div>
                            <strong>CRUCIAL RULE:</strong> Only trade when both the red and green bars are <span className={styles.highlight}>not</span> on the same contract.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Strategy;