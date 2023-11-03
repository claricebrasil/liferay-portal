/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import './AppDetailsHeader.scss';
import AppDetailsStatusDescription from './AppDetailsStatusDescription';

interface AppDetailsProps {
	appDetails?: Cart;
	hasProductDescription?: boolean;
	hasProductDetails?: boolean;
	productCreatorAccount?: string;
	productImage: string;
	productName?: string;
}

const AppDetailsHeader = ({
	appDetails,
	hasProductDescription = false,
	hasProductDetails = false,
	productCreatorAccount,
	productImage,
	productName,
}: AppDetailsProps) => {
	return (
		<div className="pb-3 pt-5">
			<div className="d-flex flex-row justify-content-between">
				<div className="d-flex flex-row">
					<img
						alt="App Icon"
						className="rounded"
						height="56px"
						src={productImage}
						width="56px"
					/>

					<div className="align-items-center ml-4">
						<h2 className="text-weight-bold">{productName}</h2>
						{hasProductDetails && (
							<AppDetailsStatusDescription
								appDetails={appDetails}
								productCreatorAccount={productCreatorAccount}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppDetailsHeader;
