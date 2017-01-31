import {
    inject,
    async,
    getTestBed,
    TestBed
} from '@angular/core/testing';
import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import { ChartService } from './chart.service';

describe('ChartService', () => {
  let mockBackend: MockBackend;
  let chartService: ChartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        ChartService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });
  }));

  beforeEach(inject([ChartService, MockBackend], (s: ChartService, m: MockBackend) => {
    chartService = s;
    mockBackend = m;
  }));

  beforeEach(() => {
    let mockResponse = [{
      name: 'service',
      data: [{
        type: 'RT',
        stats: [{
          date: '2017-01-15',
          count: 234
        }]
      }]
    }];
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
      });
  });

  describe('getPieChartData', () => {
    it('should return pie chart data', async(() => {
      chartService.getPieChartData('service', 0).subscribe((d) => {
        expect(d.labels).not.toBeNull();
        expect(d.labels[0]).toBe('RT');
        expect(d.data).not.toBeNull();
        expect(d.data[0]).toBe(234);
      });
    }));

    it('should return error message', async(() => {
      chartService.getPieChartData('service', 1).subscribe(
        (d) => {
          fail('No usage');
        },
        (error) => {
          expect(error).toBe('No usage');
        }
      );
    }));
  });

  describe('getLineChartData', () => {
    it('should return line chart data', async(() => {
      chartService.getLineChartData('RT', 'service', 0).subscribe((d) => {
        expect(d.labels).not.toBeNull();
        expect(d.labels[0]).toBe('2017-01-15');
        expect(d.data).not.toBeNull();
        expect(d.data[0].label).toBe('RT');
        expect(d.data[0].data[0]).toBe(234);
      });
    }));

    it('should return error message', async(() => {
      chartService.getLineChartData('RT', 'service', 1).subscribe(
        (d) => {
          fail('No usage');
        },
        (error) => {
          expect(error).toBe('No usage');
        }
      );
    }));
  });
});
