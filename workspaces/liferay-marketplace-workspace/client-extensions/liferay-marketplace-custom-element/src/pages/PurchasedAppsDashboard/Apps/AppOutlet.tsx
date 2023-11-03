/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import ClayNavigationBar from '@clayui/navigation-bar';
import {useEffect, useState} from 'react';
import {Outlet, useNavigate, useParams} from 'react-router-dom';

import i18n from '../../../i18n';
import { baseURL, getCart, getProductById } from '../../../utils/api';
import { getThumbnailByProductAttachment, showAppImage } from '../../../utils/util';
import useGetProductCreatorAccount from '../../GetAppPage/hooks/useGetProductCreatorAccount';
import AppDetailsHeader from './components/AppDetailsHeader';
import {AppTabEnum} from './enums/AppTabEnum';

const AppOutlet = () => {
	const navigate = useNavigate();
	
	const [active, setActive] = useState('');
	const [cart, setCart] = useState<Cart>();
	const [appLogo, setAppLogo] = useState<string>('');
	const [product, setProduct] = useState<Product>();

	const {appId: productId, orderId} = useParams();

	const productCreatorAccount = useGetProductCreatorAccount(product);


	useEffect(() => {
		const getCartInfo = async () => {
	
			const cart = await getCart(Number(orderId));
			setCart(cart);

			const product = await getProductById({
				nestedFields: 'attachments',
				productId,
			});

			setProduct(product);

			const appIcon = getThumbnailByProductAttachment(
				product.attachments
			);

			const formattedIcon = showAppImage(appIcon as string).replace(
				(appIcon as string)?.split('/o')[0],
				baseURL
			);

			setAppLogo(formattedIcon);

	};

	getCartInfo();
	}, [orderId, productId])
	
	
	return (
		<div className="d-flex flex-column w-100">
			<ClayButton
				className="align-items-center d-flex mb-4"
				displayType="unstyled"
				onClick={() => navigate('/')}
			>
				<ClayIcon className="mr-2" symbol="order-arrow-left" />
				<h5 className='mt-1'>{i18n.translate('back-to-my-apps')}</h5>
			</ClayButton>
			<AppDetailsHeader
				appDetails={cart}
				hasProductDescription={false}
				hasProductDetails={true}
				productCreatorAccount={productCreatorAccount?.name}
				productImage={appLogo}
				productName={product?.name.en_US}
			/>
			<ClayNavigationBar className="mb-4" triggerLabel={active}>
				<ClayNavigationBar.Item active={active === AppTabEnum.DETAILS}>
					<ClayButton
						onClick={() => {
							navigate(`/app/${productId}/order/${orderId}`);
							setActive(AppTabEnum.DETAILS);
						}}
					>
						{i18n.translate('details')}
					</ClayButton>
				</ClayNavigationBar.Item>
				<ClayNavigationBar.Item active={active === AppTabEnum.LICENSES}>
					<ClayButton
						onClick={() => {
							navigate(`licenses`);
							setActive(AppTabEnum.LICENSES);
						}}
					>
						{i18n.translate('licenses')}
					</ClayButton>
				</ClayNavigationBar.Item>
			</ClayNavigationBar>
			<Outlet />
		</div>
	);
};

export default AppOutlet;
