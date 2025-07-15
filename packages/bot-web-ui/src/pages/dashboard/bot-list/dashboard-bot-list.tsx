import React from 'react';
import { Text } from '@deriv/components';
import { observer, useStore } from '@deriv/stores';
import { Localize, localize } from '@deriv/translations';
import { useDBotStore } from 'Stores/useDBotStore';
import DeleteDialog from './delete-dialog';
import RecentWorkspace from './recent-workspace';
import './index.scss';

type THeader = {
    label: string;
    className: string;
};

const HEADERS: THeader[] = [
    {
        label: localize('Bot name'),
        className: 'bot-list__header__label',
    },
    {
        label: localize('Last modified'),
        className: 'bot-list__header__time-stamp',
    },
    {
        label: localize('Status'),
        className: 'bot-list__header__load-type',
    },
];

const DashboardBotList = observer(() => {
    const { load_modal, dashboard } = useDBotStore();
    const { setDashboardStrategies, dashboard_strategies } = load_modal;
    const { setStrategySaveType, strategy_save_type } = dashboard;
    const { ui } = useStore();
    const { is_desktop } = ui;
    const get_first_strategy_info = React.useRef(false);
    const get_instacee = React.useRef(false);

    React.useEffect(() => {
        setStrategySaveType('');
        
        //this dependency is used when we use the save modal popup
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [strategy_save_type]);

    React.useEffect(() => {
        if (!dashboard_strategies?.length && !get_first_strategy_info.current) {
            get_first_strategy_info.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!dashboard_strategies?.length) return null;
    return (
        <div className='bot-list__container'>
            <div className='bot-list__wrapper'>
                
                <div className='bot-list__header'>
                    {HEADERS.map(({ label, className }) => {
                        return (
                            <div className={className} key={label}>
                                
                            </div>
                        );
                    })}
                </div>
                
            </div>
            
        </div>
    );
});

export default DashboardBotList;
