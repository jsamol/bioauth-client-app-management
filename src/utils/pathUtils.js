import routes from '../navigation/routes';
import stringUtils from './stringUtils';

const pathUtils = {
  getAppDetailsPath: (app) => {
    return routes.APP_DETAILS.path
      .replace(':id', app.id)
      .replace(':name', stringUtils.toUrlParam(app.name));
  },
};

export default pathUtils;
