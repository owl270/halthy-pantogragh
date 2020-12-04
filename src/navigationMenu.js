let $result = {}
if (process.env.NODE_ENV === 'production') {
    $result = {
        items: [
            {
                id: 'archive',
                title: 'Archive',
                type: 'group',
                icon: '',
                children: [
                    {
                        id: 'archive_ways',
                        title: 'Ways',
                        type: 'item',
                        url: '/archive/ways',
                        icon: 'panto-icon ph-ways',
                    }
                ]

            },
            {
                id: 'empowerment',
                title: 'Empowerment',
                type: 'group',
                icon: '',
                children: [
                    {
                        id: 'empowerment_simulation',
                        title: 'Simulation',
                        type: 'item',
                        url: '/empowerment/simulation',
                        icon: 'panto-icon ph-simulation',
                    }
                ]
            }
        ]
    }

} else {

    $result = {
        items: [
            {
                id: 'home',
                title: 'Home',
                type: 'item',
                url: '/',
                icon: 'panto-icon ph-home',
            },
            {
                id: 'customization',
                title: 'Customization',
                type: 'item',
                url: '/customization',
                icon: 'panto-icon ph-customization',
            },
            {
                id: 'archive',
                title: 'Archive',
                type: 'group',
                icon: '',
                children: [
                    {
                        id: 'archive_points',
                        title: 'Points',
                        type: 'item',
                        url: '/archive/points',
                        icon: 'panto-icon ph-points',
                    },
                    {
                        id: 'archive_ways',
                        title: 'Ways',
                        type: 'item',
                        url: '/archive/ways',
                        icon: 'panto-icon ph-ways',
                    },
                    {
                        id: 'archive_pantographs',
                        title: 'Pantographs',
                        type: 'item',
                        url: '/archive/pantographs',
                        icon: 'panto-icon ph-pantographs',
                    }
                ]
            },
            {
                id: 'empowerment',
                title: 'Empowerment',
                type: 'group',
                icon: '',
                children: [
                    {
                        id: 'empowerment_simulation',
                        title: 'Simulation',
                        type: 'item',
                        url: '/empowerment/simulation',
                        icon: 'panto-icon ph-simulation',
                    },
                    {
                        id: 'empowerment_triggers',
                        title: 'Triggers',
                        type: 'item',
                        url: '/empowerment/triggers',
                        icon: 'panto-icon ph-triggers',
                    }
                ]
            },
            {
                id: 'extra',
                title: 'Extra',
                type: 'group',
                icon: '',
                children: [
                    {
                        id: 'extra_settings',
                        title: 'Settings',
                        type: 'item',
                        url: '/settings',
                        icon: 'panto-icon ph-settings',
                    },
                    {
                        id: 'extra_help',
                        title: 'Get Help',
                        type: 'item',
                        url: '/help',
                        icon: 'panto-icon ph-help',
                    }
                ]
            }
        ]
    }
}

export default $result
