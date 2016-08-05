import { renderComponent, expect } from '../test_helper.jsx';
import Home from '../../src/dev/views/Home.jsx'

describe('Home', () => {
    it('shows logotext', () => {
        const component = renderComponent(Home)
        expect(component).to.contain("Joogakoulu")
        expect(component).to.contain("Silta")
    })
})