/* eslint-env jest */
import {getHitBounds} from '../../src/helper/bitmap';
import {getRaster} from '../../src/helper/layer';

test('blankBitmapBounds', () => {
    const blankBitmap = document.createElement('canvas');
    blankBitmap.height = 360;
    blankBitmap.width = 480;
    expect(getHitBounds(blankBitmap.getContext('2d')).width).toBe(0);
    expect(getHitBounds(blankBitmap.getContext('2d')).height).toBe(0);
});

test('filledBitmapBounds', () => {
    const filledBitmap = document.createElement('canvas');
    filledBitmap.height = 360;
    filledBitmap.width = 480;
    const bitmapContext = filledBitmap.getContext('2d');
    
    bitmapContext.rect(10, 10, 150, 100);
    bitmapContext.fill();
    //expect(getHitBounds(bitmapContext).width).toBe(0);
    console.log('filledBitmap', filledBitmap);
    console.log('getHitBounds', getHitBounds(bitmapContext));
});
